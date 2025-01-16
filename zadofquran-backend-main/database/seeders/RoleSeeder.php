<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allPermissions = Permission::select('name')->get();

        // User Role
        Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'web',
        ], [
            'display_name' => 'User',
            'description' => 'User Role',
            'created_at' => now(),
            'updated_at' => now(),
        ])->givePermissionTo([
            // profile permissions
            ...['profile.view', 'profile.update', 'profile.softDelete'],
        ]);

        // Super Admin Role
        Role::firstOrCreate([
            'name' => 'super-admin',
            'guard_name' => 'web',
        ], [
            'display_name' => 'Super Admin',
            'description' => 'Super Admin Role',
            'created_at' => now(),
            'updated_at' => now(),
        ])->givePermissionTo(Permission::select('name')->get()->toArray());

        // Admin Role
        Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ], [
            'display_name' => 'Admin',
            'description' => 'Admin Role',
            'created_at' => now(),
            'updated_at' => now(),
        ])->givePermissionTo(Permission::select('name')->where('name', 'NOT LIKE', '%telescope%')->get()->toArray());

        // Manager Role
        Role::firstOrCreate([
            'name' => 'manager',
            'guard_name' => 'web',
        ], [
            'display_name' => 'Manager',
            'description' => 'Manager Role',
            'created_at' => now(),
            'updated_at' => now(),
        ])->givePermissionTo([
            // user permissions
            ...['users.create', 'users.list', 'users.view', 'users.update', 'users.softDelete', 'users.trash.list', 'users.trash.delete', 'users.restore', 'users.forceDelete'],

            // staff permissions
            ...['staff.create', 'staff.list', 'staff.view', 'staff.update', 'staff.softDelete', 'staff.trash.list', 'staff.delete', 'staff.restore', 'staff.forceDelete'],

            // role permissions
            ...['role.create', 'role.list', 'role.view', 'role.update', 'role.softDelete', 'role.restore', 'role.forceDelete', 'role.assignPermission', 'role.removePermission'],


            // Testimonials permission
            ...['testimonials.create', 'testimonials.list', 'testimonials.update', 'testimonials.softDelete', 'testimonials.restore', 'testimonials.delete', 'testimonials.forceDelete', 'testimonials.view'],

            // Course permissions
            ...['courses.create', 'courses.list', 'courses.update', 'courses.softDelete', 'courses.restore', 'courses.forceDelete', 'courses.view'],

            // Lesson permissions
            ...['lesson.create', 'lesson.list', 'lesson.update', 'lesson.softDelete', 'lesson.restore', 'lesson.forceDelete', 'lesson.view'],

            // Blog permissions
            ...['blogs.create', 'blogs.list', 'blogs.update', 'blogs.softDelete', 'blogs.restore', 'blogs.forceDelete', 'blogs.view'],
        ]);

        // Editor Role
        Role::firstOrCreate([
            'name' => 'editor',
            'guard_name' => 'web',
        ], [
            'display_name' => 'Editor',
            'description' => 'Editor Role',
            'created_at' => now(),
            'updated_at' => now(),
        ])->givePermissionTo([
            // FAQ permissions
            ...['faqs.create', 'faqs.list', 'faqs.update', 'faqs.softDelete', 'faqs.restore', 'faqs.forceDelete', 'faqs.view'],

            // Testimonials permission
            ...['testimonials.create', 'testimonials.list', 'testimonials.update', 'testimonials.softDelete', 'testimonials.restore', 'testimonials.delete', 'testimonials.forceDelete', 'testimonials.view'],

            // Course permissions
            ...['courses.create', 'courses.list', 'courses.update', 'courses.softDelete', 'courses.restore', 'courses.forceDelete', 'courses.view'],

            // Lesson permissions
            ...['lesson.create', 'lesson.list', 'lesson.update', 'lesson.softDelete', 'lesson.restore', 'lesson.forceDelete', 'lesson.view'],

            // Blog permissions
            ...['blogs.create', 'blogs.list', 'blogs.update', 'blogs.softDelete', 'blogs.restore', 'blogs.forceDelete', 'blogs.view'],
        ]);
    }
}
