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

In this example, we created a new user object, set its properties, and called the save method to save it to the database. We also retrieved all users from the users table using the all method, which returns a collection of user objects. We then looped through the collection and printed each user's name
