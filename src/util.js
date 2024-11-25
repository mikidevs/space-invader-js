export const map2 = (list2, mapper) =>
    list2.map(
        list1 => list1.map(e => mapper(e))
    );

export const for2 = (list2, actionP) =>
    list2.forEach((a, i) => a.forEach((b, j) => actionP(i, j)));

export const randomInt = (max) =>
    Math.floor(Math.random() * Math.floor(max));