<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [];

        // Admin Permissions
        array_push($permissions, ...[
            [
                'name' => 'admin.show',
                'display_name' => 'Show Admin Dashboard',
                'description' => 'Show Admin Dashboard',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Telescope Permissions
        array_push($permissions, ...[
            [
                'name' => 'telescope.view',
                'display_name' => 'View Telescope',
                'description' => 'View Telescope Dashboard',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Authunticated User Permissions
        array_push($permissions, ...[
            [
                'name' => 'profile.view',
                'display_name' => 'View Profile',
                'description' => 'View Profile Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'profile.update',
                'display_name' => 'Update Profile',
                'description' => 'Update Profile Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'profile.softDelete',
                'display_name' => 'Trash Profile',
                'description' => 'move Profile to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // User Permissions
        array_push($permissions, ...[
            [
                'name' => 'users.create',
                'display_name' => 'Create User',
                'description' => 'Create New User',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.list',
                'display_name' => 'User List',
                'description' => 'show List of Users',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.view',
                'display_name' => 'View User',
                'description' => 'View User Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.update',
                'display_name' => 'Update User',
                'description' => 'Update User Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.softDelete',
                'display_name' => 'Trash User',
                'description' => 'move User to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.trash.list',
                'display_name' => 'User Trash List',
                'description' => 'show List of Users in Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.restore',
                'display_name' => 'Restore User',
                'description' => 'Restore User from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.trash.delete',
                'display_name' => 'Delete User',
                'description' => 'Delete User from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.forceDelete',
                'display_name' => 'Force Delete User',
                'description' => 'Force Delete User Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.assignRole',
                'display_name' => 'Assign Role',
                'description' => 'Assign Role to User',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'users.removeRole',
                'display_name' => 'Remove Role',
                'description' => 'Remove Role from User',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Staff Permissions
        array_push($permissions, ...[
            [
                'name' => 'staff.list',
                'display_name' => 'Staff All List',
                'description' => 'show List of Staff',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.create',
                'display_name' => 'Create Staff',
                'description' => 'Create New Staff',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.update',
                'display_name' => 'Update All Staff',
                'description' => 'Update All Staff',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.view',
                'display_name' => 'View Staff',
                'description' => 'View Staff Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.softDelete',
                'display_name' => 'Trash All Staff',
                'description' => 'move All Staff to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.trash.list',
                'display_name' => 'Staff All Trash List',
                'description' => 'show List of Staff in Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.restore',
                'display_name' => 'Restore All Staff',
                'description' => 'Restore All Staff from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.delete',
                'display_name' => 'Delete All Staff',
                'description' => 'Delete All Staff from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'staff.forceDelete',
                'display_name' => 'Force Delete All Staff',
                'description' => 'Force Delete All Staff Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Role Permissions
        array_push($permissions, ...[
            [
                'name' => 'role.create',
                'display_name' => 'Create Role',
                'description' => 'Create New Role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.list',
                'display_name' => 'Role List',
                'description' => 'show List of Roles',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.view',
                'display_name' => 'View Role',
                'description' => 'View Role Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.update',
                'display_name' => 'Update Role',
                'description' => 'Update Role Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.softDelete',
                'display_name' => 'Trash Role',
                'description' => 'move Role to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.restore',
                'display_name' => 'Restore Role',
                'description' => 'Restore Role from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.delete',
                'display_name' => 'Delete Role',
                'description' => 'Delete Role from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.forceDelete',
                'display_name' => 'Force Delete Role',
                'description' => 'Force Delete Role Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.assignPermission',
                'display_name' => 'Assign Permission',
                'description' => 'Assign Permission to Role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'role.removePermission',
                'display_name' => 'Remove Permission',
                'description' => 'Remove Permission from Role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // FAQ Permissions
        array_push($permissions, ...[
            [
                'name' => 'faqs.create',
                'display_name' => 'Create FAQ',
                'description' => 'Create New FAQ',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'faqs.list',
                'display_name' => 'FAQ List',
                'description' => 'shor List of FAQs',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'faqs.view',
                'display_name' => 'View FAQ',
                'description' => 'View FAQ Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'faqs.update',
                'display_name' => 'Update FAQ',
                'description' => 'Update FAQ Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'faqs.softDelete',
                'display_name' => 'Trash FAQ',
                'description' => 'move FAQ to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'faqs.restore',
                'display_name' => 'Restore FAQ',
                'description' => 'Restore FAQ from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'faqs.delete',
                'display_name' => 'Delete FAQ',
                'description' => 'Delete FAQ from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'faqs.forceDelete',
                'display_name' => 'Force Delete FAQ',
                'description' => 'Force Delete FAQ Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Testimonials Permission
        array_push($permissions, ...[
            [
                'name' => 'testimonials.create',
                'display_name' => 'Create Testimonial',
                'description' => 'Create New Testimonial',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.list',
                'display_name' => 'Testimonial List',
                'description' => 'Show List of Testimonials',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.view',
                'display_name' => 'View Testimonial',
                'description' => 'View Testimonial Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.update',
                'display_name' => 'Update Testimonial',
                'description' => 'Update Testimonial Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.softDelete',
                'display_name' => 'Trash Testimonial',
                'description' => 'Move Testimonial to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.restore',
                'display_name' => 'Restore Testimonial',
                'description' => 'Restore Testimonial from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.delete',
                'display_name' => 'Delete Testimonial',
                'description' => 'Delete Testimonial from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'testimonials.forceDelete',
                'display_name' => 'Force Delete Testimonial',
                'description' => 'Force Delete Testimonial Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Course Permission
        array_push($permissions, ...[
            [
                'name' => 'courses.create',
                'display_name' => 'Create Course',
                'description' => 'Create New Course',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.list',
                'display_name' => 'Course List',
                'description' => 'Show List of Courses',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.view',
                'display_name' => 'View Course',
                'description' => 'View Course Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.update',
                'display_name' => 'Update Course',
                'description' => 'Update Course Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.softDelete',
                'display_name' => 'Trash Course',
                'description' => 'Move Course to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.restore',
                'display_name' => 'Restore Course',
                'description' => 'Restore Course from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.delete',
                'display_name' => 'Delete Course',
                'description' => 'Delete Course from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'courses.forceDelete',
                'display_name' => 'Force Delete Course',
                'description' => 'Force Delete Course Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Plan Permission
        array_push($permissions, ...[
            [
                'name' => 'plans.create',
                'display_name' => 'Create Plan',
                'description' => 'Create New Plan',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.list',
                'display_name' => 'Plan List',
                'description' => 'Show List of Plans',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.view',
                'display_name' => 'View Plan',
                'description' => 'View Plan Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.update',
                'display_name' => 'Update Plan',
                'description' => 'Update Plan Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.softDelete',
                'display_name' => 'Trash Plan',
                'description' => 'Move Plan to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.restore',
                'display_name' => 'Restore Plan',
                'description' => 'Restore Plan from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.delete',
                'display_name' => 'Delete Plan',
                'description' => 'Delete Plan from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'plans.forceDelete',
                'display_name' => 'Force Delete Plan',
                'description' => 'Force Delete Plan Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Blog Permission
        array_push($permissions, ...[
            [
                'name' => 'blogs.create',
                'display_name' => 'Create Blog',
                'description' => 'Create New Blog',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.list',
                'display_name' => 'Blog List',
                'description' => 'Show List of Blogs',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.view',
                'display_name' => 'View Blog',
                'description' => 'View Blog Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.update',
                'display_name' => 'Update Blog',
                'description' => 'Update Blog Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.softDelete',
                'display_name' => 'Trash Blog',
                'description' => 'Move Blog to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.restore',
                'display_name' => 'Restore Blog',
                'description' => 'Restore Blog from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.delete',
                'display_name' => 'Delete Blog',
                'description' => 'Delete Blog from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'blogs.forceDelete',
                'display_name' => 'Force Delete Blog',
                'description' => 'Force Delete Blog Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Comment Permission
        array_push($permissions, ...[
            [
                'name' => 'comments.list',
                'display_name' => 'Comment List',
                'description' => 'Show List of Comments',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.view',
                'display_name' => 'View Comment',
                'description' => 'View Comment Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.create',
                'display_name' => 'Create Comment',
                'description' => 'Create New Comment',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.update',
                'display_name' => 'Update Comment',
                'description' => 'Update Comment Information',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.approve',
                'display_name' => 'Approve Comment',
                'description' => 'Approve Comment',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.softDelete',
                'display_name' => 'Trash Comment',
                'description' => 'Move Comment to Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.restore',
                'display_name' => 'Restore Comment',
                'description' => 'Restore Comment from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.delete',
                'display_name' => 'Delete Comment',
                'description' => 'Delete Comment from Trash',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'comments.forceDelete',
                'display_name' => 'Force Delete Comment',
                'description' => 'Force Delete Comment Permanently',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Mail Permissions
        array_push($permissions, ...[
            [
                'name' => 'mails.system.subscribe.recieve',
                'display_name' => 'Recieve Subscribe Mail',
                'description' => 'Recieve Subscribe Mail from System',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'mails.system.contact.recieve',
                'display_name' => 'Recieve Contact Mail',
                'description' => 'Recieve Contact Mail from System',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Subscriber Permissions
        array_push($permissions, ...[
            [
                'name' => 'subscribers.list',
                'display_name' => 'Subscriber List',
                'description' => 'Show List of Subscribers',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        Permission::insert($permissions);
    }
}
