const double = p => p + p

console.log(double(5))

const altSum = function(p1, p2) {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = altSum(1,5)
console.log(result)

const t = [1,2,3]
const tSquared = t.map(p => p*p)
console.log(tSquared)