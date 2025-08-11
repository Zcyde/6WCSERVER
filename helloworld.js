export default function (firstName, lastName, age) {
    return {
        firstName: firstName,
        lastName: lastName,
        age: age,
        fullName: function() {
            return this.firstName + " " + this.lastName 
        }, 
        isAdult: function() {
            return this.age >= 18;
        }
        
    }
}

