<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use App\Models\AdminUser;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $email = "admin@cnspro.co.nz";
        $find = AdminUser::firstWhere('email', $email);
        if($find){
            return;
        }

        Model::unguard();
        DB::table('admin_users')->insert([
            'first_name' => "Admin",
            'last_name' => "CNSPRO",
            'email' => $email,
            'password' => Hash::make("Admin_2021"),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        Model::reguard();

    }
}
