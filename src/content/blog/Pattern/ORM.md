---
title: ORM Pattern
date: 2024-02-12
postLayout: simple
draft: false
summary: ORM Pattern
tags: [php, designpatterns]
---

## ORM Pattern

ORM stands for Object-Relational Mapping. It is a programming technique used to map database tables to classes, and map table rows to objects, making it easier to interact with a database using an object-oriented programming approach.

Using ORM, developers can avoid writing raw SQL queries and instead interact with the database using objects, making it easier to create, read, update, and delete data.

Here's an example of using an ORM in PHP with the popular library called Eloquent, which is part of the Laravel framework:

First, you define a model class that extends Eloquent:

```php
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
}
```

Then, you can use this model to interact with the users table in the database:

```php
$user = new User;
$user->name = 'John';
$user->email = 'john@example.com';
$user->save();

$users = User::all();

foreach ($users as $user) {
    echo $user->name . '<br>';
}
```
In this example, we define a User model class extending Eloquent. We then utilize this model to interact with the users table in the database. By creating a new User object, setting its properties, and calling the save method, we persist data to the database. Furthermore, we retrieve all users using the all method, which returns a collection of user objects. Finally, we iterate through the collection, printing each user's name.

ORM patterns like Eloquent simplify database operations, promoting cleaner, more maintainable codebases.






