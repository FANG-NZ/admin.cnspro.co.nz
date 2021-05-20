<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class APISiteConfigTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_load_siteconfig()
    {
        $response = $this->json('get', 'api/settings/load');

        $response->assertStatus(Response::HTTP_OK);
        $response->assertJsonStructure(
            [
                'email', 'phone', 'address', 'facebook', 'instagram'
            ]
        );
    }
}
