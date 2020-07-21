const preminumUsers = [
    {name: 'John', premium: false},
    {name: 'Jane', premium: true},
    {name: 'Kyle', premium: false},
    {name: 'Harry', premium: true},
    {name: 'Luke', premium: true}
];

const Activepremium = (users) =>{
    return users.filter(user => user.premium);
}

export {Activepremium, preminumUsers as default};