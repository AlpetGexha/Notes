---
title: Singleton Pattern
date: 2024-02-12
postLayout: simple
draft: false
summary: Singleton Pattern in PHP
tags: [php, designpatterns]
---

## Singleton Pattern

`Singleton Pattern` - është një model dizajni që kufizon instancën e një klase në një objekt, duke siguruar akses global në atë objekt përgjatë aplikacionit.

**Singleton Pattern** është i dos bishëm në situatat kur duhet të siguroheni që të krijohet vetëm një instance të një klase dhe që kjo instanc të jetë lehtësisht e aksesueshëm nga pjesët e tjera të aplikacionit

```php
class Singleton
{
    private static $instance = null;

    private function __construct() {
        // Private constructor to prevent instantiation from outside
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function doSomething() {
        echo "Doing something...";
    }
}
```

Class `Singleton` ka një `__construct` për të parandaluar instancën nga jashtë klasës. Ajo gjithashtu ka një metodë statike `getInstance()` që kthen shembullin e vetëm të klasës. Nëse nuk ekziston asnjë shembull i klasës, ajo krijon një dhe e kthen atë. Përndryshe, ai thjesht kthen shembullin ekzistues.

Për të përdorur class Singleton, do të thërras metodën `getInstance()` për të marrë instancën e klasës dhe më pas do të thërrisni metodën `doSomething()` në atë shembull:

```php
$singleton = Singleton::getInstance();
$singleton->doSomething();
// return doSomething
```

Nëse provojm ta krijom `Singleton` duke perdorur kontruktorin, do të dështoj, sepse construkotri eshte privat

```php
// This will fail with a fatal error
$singleton = new Singleton();
```

Një shembull real ne Query Builder

```php
class QueryBuilder
{
    private static $database;
    private $pdo;
    private $table;
    ...

    private function __construct(PDO $pdo, string $table)
    {
        $this->pdo = $pdo;
        $this->table = $table;
    }

    public static function table(string $table): self
    {
        $options = [
            // ...
        ];

        $pdo = new PDO('mysql:host=localhost;dbname=query_builder', 'root', '', $options);

        // singleton pattern
        if (!isset(self::$database)) {
            self::$database = new self($pdo, $table);
        }

        return self::$database;
    }
    ...
}

```

Perdorimi

```php
$query = QueryBuilder::table('users')->get(); // this return query rezult
$query = new QueryBuilder(); // this return fatal error
```
