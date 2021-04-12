<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class AdminUser extends Authenticatable
{
    use Notifiable, HasFactory;

    //define the admin table name
    protected $table = "admin_users";


    /**
     * Function is to update new password
     */
    public function updatePassword($new){
        $this->password = Hash::make($new);
        $this->save();
    }

}
