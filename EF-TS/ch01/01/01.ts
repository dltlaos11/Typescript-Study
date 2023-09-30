interface State {
    name: string;
    capital: string;
}
const states: State[] = [
    {name: 'Alab', capital: "mont"},
    {name: 'Alab', capital: "mont"},
]
for (const state of states) {
    console.log(state.capital);
}