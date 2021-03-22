<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectTb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->boolean('is_new')->default(false);
            $table->string('title')->nullable();
            $table->date('completed_on')->nullable();

            //For address
            $table->string('street')->nullable();
            $table->string('city')->nullable();

            //For properties 
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('carpark')->nullable();
            $table->string('livingrooms')->nullable();
            $table->string('land_area')->nullable();
            $table->string('floor_area')->nullable();

            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
