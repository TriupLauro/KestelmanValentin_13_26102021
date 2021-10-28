//Format the amount of money adding comas
export function formatAmount(amount) {
    let smallRest = amount % 1000
    let bigRest = (amount - smallRest)
    const parts = [smallRest.toFixed(2)]
    while (bigRest > 0) {
        let part = bigRest / 1000
        smallRest = part % 1000
        bigRest = part - smallRest
        parts.unshift(smallRest.toString(10))
    }
    let result = ''
    parts.map((part,index) => {
        if (index === 0) {
            result += `${part}`
        }else{
            result += `,${fillZero(part)}`
        }
    })
    return result
}

function fillZero(subPart) {
    if (subPart >= 100) return subPart
    if (subPart >= 10) return '0' + subPart
    return '00' + subPart
}