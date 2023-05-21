"use strict";

/////////////////////////////////////////
// notes - planning
/*

1. User stories - description of the apps functionality from the user perspective
2. features
3. flowchart - what we will build
4. architecture - how we build it 
5. development step

*/

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lon]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDesc() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.desc = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence, id = null) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDesc();
    if (id) this.id = id;
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain, id = null) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDesc();
    if (id) this.id = id;
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 5.2, 24, 178);

// (run1, cycling1);

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
const deleteAll = document.querySelector(".delete-all");

////////////////////////////
// APP ARCHITECTURE
class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];

  constructor() {
    // get user position
    this._getPosition();

    // get data from local storage
    this._getLocalStorage();

    // event listeners
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
    deleteAll.addEventListener("click", this._deleteAll.bind(this));
    containerWorkouts.addEventListener("click", e => {
      if (e.target.classList.contains("delete")) {
        this._deleteWorkout(e);
      }
      if (e.target.classList.contains("edit")) {
        console.log("pog");

        this._editWorkout(e);
      }
    });
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get position");
        }
      );
    }
  }

  _loadMap(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    `https://www.google.com/maps/@${lat},${lon}`;

    const coords = [lat, lon];

    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on("click", this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = "";
    inputDuration.value = "";
    inputCadence.value = "";
    inputElevation.value = "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // get data from form
    const type = inputType.value;
    const dist = +inputDistance.value;
    const dur = +inputDuration.value;
    let workout;

    // if running , create running object
    if (type === "running") {
      const cadence = +inputCadence.value;

      if (
        !validInputs(dist, dur, cadence) ||
        !allPositive(dist, dur, cadence)
      ) {
        return alert("Inputs must be positive numbers!");
      }

      workout = new Running(this.#mapEvent.latlng, dist, dur, cadence);
    }

    // if cycling, create cycling object
    if (type === "cycling") {
      const elGain = +inputElevation.value;
      if (!validInputs(dist, dur, elGain) || !allPositive(dist, dur))
        return alert("Inputs must be positive numbers!");

      workout = new Cycling(this.#mapEvent.latlng, dist, dur, elGain);
    }

    // add new object to workout array
    this.#workouts.push(workout);

    //render workout on map as marker
    this._renderWorkoutMarker(workout);

    // render workout as list
    this._renderWorkout(workout);

    // clear input fields + hide form
    this._hideForm();

    // set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    workout.marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minwidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.desc}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.desc}</h2>
        <button class = "delete">Delete</button>
        <button class = "edit">Edit</button>
        <div class="workout__details">
            <span class="workout__icon">${
              workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
        </div>`;

    if (workout.type === "running") {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;
    }

    if (workout.type === "cycling") {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;
    }
    form.insertAdjacentHTML("afterend", html);
  }

  _deleteWorkout(e) {
    const workoutEl = e.target.closest(".workout");
    if (!workoutEl) return;

    const workoutId = workoutEl.dataset.id;

    // find index of matching id
    const workoutIndex = this.#workouts.findIndex(
      workout => workout.id === workoutId
    );

    if (workoutIndex === -1) return;
    const workout = this.#workouts[workoutIndex];
    // delete marker
    this.#map.removeLayer(workout.marker);

    // remove workout from #workouts
    this.#workouts.splice(workoutIndex, 1);

    // remove workout element from the DOM
    workoutEl.remove();

    // update local storage
    this._setLocalStorage();
  }

  _editWorkout(e) {
    // this._deleteWorkout(e);

    const workoutEl = e.target.closest(".workout");
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    const workoutIndex = this.#workouts.findIndex(
      work => work.id === workoutEl.dataset.id
    );

    // Set the map event to the coordinates of the workout
    this.#mapEvent = { latlng: workout.coords };

    document.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        this._submitEdit(workout, workoutIndex);
      }
    });

    // update form values with workout data
    inputType.value = workout.type;
    inputDistance.value = workout.distance;
    inputDuration.value = workout.duration;
    inputCadence.value = workout.cadence || "";
    inputElevation.value = workout.elevationGain || "";

    // show form
    form.style.display = "grid";
    form.classList.remove("hidden");

    // // update workout in the array
    // this.#workouts[workoutIndex] = workout;

    // Update the workout object instead of replacing it
    this.#workouts[workoutIndex] = {
      ...workout,
      type: inputType.value,
      distance: +inputDistance.value,
      duration: +inputDuration.value,
      cadence: +inputCadence.value || 0,
      elevationGain: +inputElevation.value || 0,
    };

    // set local storage to all workouts
    this._setLocalStorage();

    // remove old workout from UI
    workoutEl.remove();

    // update workout marker on the map
    this.#map.removeLayer(workout.marker);
    this._renderWorkoutMarker(this.#workouts[workoutIndex]);
  }

  // render workout as list
  // this._renderWorkout(this.#workouts[workoutIndex]);
  // console.log(workout);
  _submitEdit(workout, workoutIndex) {
    // Delete the old unedited object from local storage
    const storedWorkouts = JSON.parse(localStorage.getItem("workouts"));
    const updatedWorkouts = storedWorkouts.filter(
      work => work.id !== workout.id
    );
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

    // Submit the new edited object
    const editedWorkout = {
      ...workout,
      type: inputType.value,
      distance: +inputDistance.value,
      duration: +inputDuration.value,
      cadence: +inputCadence.value || 0,
      elevationGain: +inputElevation.value || 0,
    };

    // Update the workout in the array
    this.#workouts[workoutIndex] = editedWorkout;

    // Set local storage to all workouts
    this._setLocalStorage();

    // Remove old workout from UI
    const workoutEl = document.querySelector(`[data-id="${workout.id}"]`);
    if (workoutEl) workoutEl.remove();

    // Update workout marker on the map
    this.#map.removeLayer(workout.marker);
    this._renderWorkoutMarker(editedWorkout);

    // Hide the form
    this._hideForm();

    location.reload();
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    workout;

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  // _setLocalStorage() {
  //   localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  // }

  _setLocalStorage() {
    const workoutsWithoutMarkers = this.#workouts.map(workout => {
      // Exclude the 'marker' property from each workout object
      const { marker, ...workoutWithoutMarker } = workout;
      return workoutWithoutMarker;
    });

    localStorage.setItem("workouts", JSON.stringify(workoutsWithoutMarkers));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    data;

    if (!data) return;

    // this.#workouts = data.;
    // this.#workouts.forEach(work => {
    //   this._renderWorkout(work);
    // });

    this.#workouts = data.map(work => {
      if (work.type === "running") {
        return new Running(
          work.coords,
          work.distance,
          work.duration,
          work.cadence,
          work.id
        );
      } else if (work.type === "cycling") {
        return new Cycling(
          work.coords,
          work.distance,
          work.duration,
          work.elevationGain,
          work.id
        );
      }
      console.log(work);
    });

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      console.log(work);
    });
  }

  _deleteAll() {
    localStorage.removeItem("workouts");
    location.reload();
  }

  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new App();
