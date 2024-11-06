const map2 = <a> (list2: a[][], mapper: (e: a) => a): a[][] =>
    list2.map(
        list1 => list1.map(e => mapper(e))
    );

const for2 = <a> (list2: a[][], actionP: (e: a) => void): void =>
    list2.forEach(i => i.forEach(actionP));