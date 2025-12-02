<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * El modelo asociado a esta factory.
     */
    protected $model = User::class;

    /**
     * Define el estado por defecto del modelo.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Contador simple para que los correos sean únicos
        static $count = 1;

        return [
            'name' => 'Usuario ' . $count,
            'email' => 'user' . $count++ . '@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // contraseña por defecto
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indica que el correo no está verificado.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
