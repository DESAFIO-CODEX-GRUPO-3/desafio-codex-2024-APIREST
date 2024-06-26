

class User {
    private id: String;
    private fullName: String;
    private gender: String;
    private age: number;
    private email: String;
    private password: String;

    constructor(builder: UserBuilder) {
        this.id = builder.id;
        this.fullName = builder.fullName;
        this.gender = builder.gender;
        this.age = builder.age;
        this.email = builder.email;
        this.password = builder.password;
    }

    public getId(): String { return this.id; }
    public getFullName(): String { return this.fullName; }
    public getGender(): String { return this.gender; }
    public getAge(): number { return this.age; }
    public getEmail(): String { return this.email; }
    public getPassword(): String { return this.password; }
}

class UserBuilder {
    id: String;
    fullName: String;
    gender: String;
    age: number;
    email: String;
    password: String;

    constructor() {
        this.id = "";
        this.fullName = "";
        this.gender = "";
        this.age = 0;
        this.email = "";
        this.password = "";
    }

    public setId(id: String): UserBuilder {
        this.id = id;
        return this;
    }

    public setFullName(fullName: String): UserBuilder {
        this.fullName = fullName;
        return this;
    }

    public setGender(gender: String): UserBuilder {
        this.gender = gender;
        return this;
    }

    public setAge(age: number): UserBuilder {
        this.age = age;
        return this;
    }

    public setEmail(email: String): UserBuilder {
        this.email = email;
        return this;
    }

    public setPassword(password: String): UserBuilder {
        this.password = password;
        return this;
    }

    public build(): User { return new User(this); }
}

export { UserBuilder, User };