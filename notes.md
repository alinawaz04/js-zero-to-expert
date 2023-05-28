# Forkify Notes/ Planning

## Project Planning I

### why worry about architecture?

    maintainability, structure, expandablity

### components of any architecture

    business logic
        - solves actual business problem
        - directly related to what business does and what it needs
    state
        - essentially stores all the data of app
        - should be "single source of truth"
        - UI should be kept in sync with state
    http library
        - responsible for making and recieving AJAX reqs
        - optional but almost always necessary
    app logic(router)
        - code that is only concerned about implementation of app itself
        - (nav and UI events)
    presentation logic(ui layer)
        - code that is concerned with the visible part of the app
        - displays app state - (keep in sync with state)

### model-view-controller (mvc) architecture

    model
        - business logic
        - state
        - http library
    controller
        -app logic - bridge between model and views
    view
        - presentation logic

### event handling in MVC

    - events should be handled in controller
    - events should be listened for in the view

## Project Planning II

### new features

    - change servings
    - bookmarking functionality
    - store bookmark data in the browser
    - on page load, read saved bookmarks

## Project Planning III

    - self recipe upload
    - self recipes auto bookmarked
    - user can only see own recipes
