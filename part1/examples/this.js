const brian = {
    name: "Brian McGillick",
    age: 27,
    education: "BEng",
    greet: function() {
        console.log(`Hello, my name is ${this.name}`)
    },
    doAddition: function(a, b) {
        console.log(a + b)
    }
}

brian.greet()

brian.growOlder = function() {
    this.age ++
}
console.log(brian.age)
brian.growOlder()
console.log(brian.age)

brian.doAddition(1, 4)

const addition = brian.doAddition
addition(1,9)

const greeting = brian.greet
greeting()