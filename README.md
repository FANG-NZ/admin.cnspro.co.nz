## Admin of cnspro.co.nz

admin.cnspro.co.nz is a web application for CNSPRO LTD to manage properties, and other basic information. THIS is just CMS part for CNSPRO, the frontend is developed by NEXT JS and seperated in different server, communicate via API.

## Structure

### Backend (PHP) codes

* `app/Http/Controllers`: PHP code
    * `app/Http/Controllers/DashboardController.php`: The dashboard page controller
    * `app/Http/Controllers/ProjectController.php`: The project page controller to handle request for projects (ADD, UPDATE, DELETE ...)
    * `app/Http/Controllers/SettingsController.php`: The settings page controller
    * `app/Http/Controllers/LoginController.php`: The login page controller 

* `app/Http/Middleware`: PHP code
    * `app/Http/Middleware/JSONResponse.php`: The middleware to setup response header for ajax request

* `app/Traits`: PHP code
    * `app/Traits/ResponseTrait.php`: The helper trait to setup response message into session

* `app/Models`: PHP code
    * `app/Models/AdminUser.php`: The admin user model, seperate from client(User)
    * `app/Models/Project.php`: The project model to hold basic property information
    * `app/Models/ProjectImage.php`: The image of project, there is has-many relationship between Project & ProjectImage
    * `app/Models/BannerSlider.php`: The banner slider model, there is has-many relationship between BannerSlider and Image
    * `app/Models/Image.php`: The image model 

* `routes`: PHP code
    * `routes/web.php`: To deifne the routes for CMS

### Frontend (JS/TS) code

* `resources/js`: jQuery to create basic interface of CMS
* `resources/react`: React & Redux /TypeScript
    * `resources/react/pages`: TS code
        * `resources/react/pages/dashboard`: This is to create interface for dashboard, all related components are placed here
        * `resources/react/pages/projects`: This is to create and setup the interface of Project Page 
    * `resources/react/tools`: JS code  
        * `resources/react/tools/confirm-dialog`: The global confirm dialog using Observer pattern to trigger SHOW/HIDE/CONFIRM
        * `resources/react/tools/loading-spinner`: The global loading icon using Observer pattern
        * `resources/react/tools/toast-box`: The global toast box using bootstrap/toast and Observer pattern
        * `resources/react/tools/fetch-client.ts`: The helper class to handle window.fetch accroding to request (e.g. GET, PUT, POST, DELETE)
     * `resources/react/types`: TS code  
        * `resources/react/types/project-item.type.ts`: The type defination
of project item
        * `resources/react/types/banner-slider-item.type.ts`: The type defination of banner slider item

### Frontend (CSS/SCSS) code
* `resources/sass`: CSS/SCSS based on bootstrap farmework 

### Testing (PHPUnit)
* `tests/Feature`: PHPUnit testing code 


## Setup
### Requirements

- Working Laravel development environment (e.g. LAMP stack).
- PHP version ^7.3|^8.0
- Node version ^14.*
- [Composer](https://getcomposer.org/doc/00-intro.md)

Your web root **must** point to the `public/` folder (not the root of the project). 

### Installation

```
composer install
npm install

```

### Configuration

Create a `.env` file in your project root

### Compilation

```
npm run watch
```

### Production
```
npm run prod
```

### Testing (PHP and JS)
```
php artisan test
npm test
```
