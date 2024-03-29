const infoMap = new Map([
    ['.buffs', {'type' : 'image', 'img' : 'https://media.discordapp.net/attachments/790451126956064778/796177528129060894/unknown.png'}],
    ['.mabuffs', {'type' : 'image', 'img' : 'https://media.discordapp.net/attachments/699480933673205762/859682518877863976/MSM_food_buffs_mag.png'}],
    ['.pabuffs', {'type' : 'image', 'img' : 'https://media.discordapp.net/attachments/699480933673205762/859682533545345074/PA_BUFFS.png'}],
    ['.cubes', {'type' : 'image', 'img' : 'https://cdn.discordapp.com/attachments/997499305948610622/997937233501896814/unknown.png?width=810&height=966'}],
    ['.flames', {'type' : 'image', 'img' : 'https://images-ext-1.discordapp.net/external/em3jM3KZyMJFzBVJT89u-_L-UuHc7I3lbBQsB0yhjJs/https/i.imgur.com/UPrSqQu.png?width=437&height=669'}],
    ['.statcap', {'type' : 'image', 'img' : 'https://media.discordapp.net/attachments/997499305948610622/997523773710409779/image0.jpg'}],
    ['.hyper', {'type' : 'image', 'img' : 'https://cdn.discordapp.com/attachments/997499305948610622/997937270936043663/image2.png'}],
    ['.soul', {'type' : 'image', 'img' : 'https://cdn.discordapp.com/attachments/997499305948610622/997937271162548326/VAW1KJE.png?width=1206&height=966'}],
    ['.pba', {'type' : 'image', 'img' : 'https://cdn.discordapp.com/attachments/541458491361984513/684303643905753112/unknown.png'}],
    ['.pba2', {'type' : 'image', 'img' : 'https://cdn.discordapp.com/attachments/712890391011131394/838245030175047760/Screen_Shot_2021-05-01_at_10.45.52_PM.png'}],
    ['.link', {'type' : 'image', 'img' : 'https://images-ext-2.discordapp.net/external/fJJsMJ1JII4JRsy7V64EYAxc6kQ6d8QSPV6bh4OmMq0/https/cdn-longterm.mee6.xyz/plugins/commands/images/413046906638565395/d89f0cac131aaceb60bac47f18af1798ff156ec82151dc4314b58f664eb0ad92.png?width=826&height=670'}],
    ['.culvert', {'type' : 'image', 'img' : 'https://media.discordapp.net/attachments/712292642733686846/769952604502491218/Buff_Pot_Checkliist.png'}],
    ['.nexon', {'type' : 'image', 'img' : 'https://media.discordapp.net/attachments/519774750680154123/837032001722384425/image0.gif'}],
    ['.magnus', {'type' : 'embed', embed: {
            image: {
                url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/884d5e19-e82d-49bd-acec-58e56eafbb7a/d6f6qjv-55887e39-7840-44f3-ab39-ebbb3c85c0be.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg4NGQ1ZTE5LWU4MmQtNDliZC1hY2VjLTU4ZTU2ZWFmYmI3YVwvZDZmNnFqdi01NTg4N2UzOS03ODQwLTQ0ZjMtYWIzOS1lYmJiM2M4NWMwYmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.r9Unu4aeWJOTKk3tnkc5lPxUk4f7zP9hVIbJ4u5EHME'
            },
            color: 15406156,
            title: "Magnus (Commander Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=xLUqJIle7AM)",
            footer: {
                text: '═════ Boss Info (Party/Multi) ═════\n' +
                    'Sim \t HP: 72.675 b | Crit Resist: 40%\n' +
                    'Hard \t HP: 405.0 b | Crit Resist: 50%\n' +
                    '═════ Boss Info (Single) ═════\n' +
                    'Sim \t HP: 9.69 b | Crit Resist: 40%\n' +
                    'Hard \t HP: 54.0 b | Crit Resist: 50%\n'
            }
        }}],
    ['.hilla', {'type' : 'embed', embed: {
            image: {
                url: 'https://media.discordapp.net/attachments/590455709334765568/825850493674061874/image0.gif'
            },
            color: 15406156,
            title: "Hilla (Commander Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=3039ovmaIk4)",
            footer: {
                text: '═════ Boss Info (Party) ═════\n' +
                    'Normal \t HP: 24.5 b | Crit Resist: 30%\n' +
                    'Hard \t HP: 31.5 b | Crit Resist: 32%\n' +
                    'Chaos \t HP: 90.0 b | Crit Resist: 34%\n\n' +
                    '═════ Boss Info (Single) ═════\n' +
                    'Normal \t HP: 7.0 b | Crit Resist: 31%\n' +
                    'Hard \t HP: 9.0 b | Crit Resist: 33%\n' +
                    'Chaos \t HP: 12.0 b | Crit Resist: 35%\n'
            }
        }}],
    ['.vonleon', {'type' : 'embed', embed: {
            image: {
                url: 'http://media.playpark.net/MapleStory/uploadimages/von_leon.gif'
            },
            color: 15406156,
            title: "Von Leon (Commander Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=VlMFDqNf0cs)",
            footer: {
                text: '═════ Boss Info (Party) ═════\n' +
                    'Normal \t HP: 2.45 b | Crit Resist: 22%\n' +
                    'Hard \t HP: 5.6 b | Crit Resist: 26%\n' +
                    'Chaos \t HP: 45.0 b | Crit Resist: 30%\n\n' +
                    '═════ Boss Info (Single) ═════\n' +
                    'Normal \t HP: 0.595 b | Crit Resist: 20%\n' +
                    'Hard \t HP: 1.6 b | Crit Resist: 24%\n' +
                    'Chaos \t HP: 6.0 b | Crit Resist: 28%\n'
            }
        }}],
    ['.vellum', {'type' : 'embed', embed: {
            image: {
                url: 'https://cdn.discordapp.com/attachments/590455709334765568/825825739885510698/image0.gif'
            },
            color: 15406156,
            title: "Vellum (Root Abyss Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=3A0FIVEshVU)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 34.0 b | Crit Resist: 30%\n' +
                    'Hard \t HP: 100.0 b | Crit Resist: 32%\n' +
                    'Chaos \t HP: 170.0 b | Crit Resist: 35%\n'
            }
        }}],
    ['.queen', {'type' : 'embed', embed: {
            image: {
                url: 'https://media.discordapp.net/attachments/590455709334765568/825845460232699944/image0.gif'
            },
            color: 15406156,
            title: "Crimson Queen (Root Abyss Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=cT1PYgl6CSA)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 38.5 b | Crit Resist: 30%\n' +
                    'Hard \t HP: 110.0 b | Crit Resist: 32%\n' +
                    'Chaos \t HP: 180.0 b | Crit Resist: 35%\n'
            }
        }}],
    ['.pierre', {'type' : 'embed', embed: {
            image: {
                url: 'https://rebootms.files.wordpress.com/2016/05/pierre1.gif?w=620'
            },
            color: 15406156,
            title: "Pierre (Root Abyss Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=tHpgCJGlMcY)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 25.2288 b | Crit Resist: 30%\n' +
                    'Hard \t HP: 69.12 b | Crit Resist: 32%\n' +
                    'Chaos \t HP: 110.0 b | Crit Resist: 35%\n'
            }
        }}],
    ['.vonbon', {'type' : 'embed', embed: {
            image: {
                url: 'https://rebootms.files.wordpress.com/2016/05/banban1.gif?w=620'
            },
            color: 15406156,
            title: "Von Bon (Root Abyss Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=oqcvehH6IWY)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 25.2288 b | Crit Resist: 30%\n' +
                    'Hard \t HP: 69.12 b | Crit Resist: 32%\n' +
                    'Chaos \t HP: 110.0 b | Crit Resist: 35%\n'
            }
        }}],
    ['.cygnus', {'type' : 'embed', embed: {
            image: {
                url: 'https://spadow.files.wordpress.com/2010/12/cygnus-die1.gif?w=630'
            },
            color: 15406156,
            title: "Cygnus Empress (Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=2h2ISyWRNe8)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 0.555 b | Crit Resist: 0%\n' +
                    'Hard \t HP: 4.344 b | Crit Resist: 0%\n' +
                    'Chaos \t HP: 21.0 b | Crit Resist: 30%\n'
            }
        }}],
    ['.pinkbean', {'type' : 'embed', embed: {
            image: {
                url: 'https://media3.giphy.com/media/dqqKpkphmoRrmkvN7Y/giphy.gif'
            },
            color: 15406156,
            title: "Pink Bean (Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=cRpRmg6SlZw)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 0.504 b | Crit Resist: 0%\n' +
                    'Hard \t HP: 2.43 b | Crit Resist: 0%\n' +
                    'Chaos \t HP: 15.0 b | Crit Resist: 20%\n'
            }
        }}],
    ['.horntail', {'type' : 'embed', embed: {
            image: {
                url: 'https://media.discordapp.net/attachments/590455709334765568/825949254433636402/image0.gif'
            },
            color: 15406156,
            title: "Horn Tail (Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=Sk1nHJtPDzY)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 0.141 b | Crit Resist: 0%\n' +
                    'Hard \t HP: 1.573 b | Crit Resist: 0%\n' +
                    'Chaos \t HP: 12.412 b | Crit Resist: 10%\n'
            }
        }}],
    ['.zakum', {'type' : 'embed', embed: {
            image: {
                url: 'https://cdn.discordapp.com/attachments/590455709334765568/825853972052574238/image0.gif'
            },
            color: 15406156,
            title: "Zakum (Boss)",
            description: "[Video Guide](https://www.youtube.com/watch?v=zKFZcfPdEr4)",
            footer: {
                text: '═════ Boss Info ═════\n' +
                    'Normal \t HP: 0.070 b | Crit Resist: 0%\n' +
                    'Hard \t HP: 0.264 b | Crit Resist: 0%\n' +
                    'Chaos \t HP: 3.529 b | Crit Resist: 5%\n'
            }
        }}]
]);

module.exports = infoMap;
