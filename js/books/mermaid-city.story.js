/* Book 2 story: "Sophia and the Mermaid City". Everything after the `=` is plain JSON.
   (It sits in a .js file so the book still opens straight from disk, where fetching .json is blocked.)

   Page fields
     id, title         URL slug and Pages-menu label
     chapter           { "n": 1, "title": "..." } draws a chapter header above the text
     scene             art key, drawn in js/books/mermaid-city.js
     theme, fx         world theme and canvas effect
     pickup            { "item", "x", "y", "size" } a treasure to tap in the picture (800 x 500 coordinates)
     ocarina           { "tune": [...] } the playable Gate Song puzzle
     alt               what the picture shows
     text              one string per paragraph, with markup from js/art/ui.js:
                       {name} {sfx:sound|LABEL} {say:...} {pip:...} {shout:...} {huge:...} {whisper:...} {b:...} and "{divider}" */
(window.SB.stories = window.SB.stories || {})['mermaid-city'] =
{
  "id": "mermaid-city",
  "title": "Sophia and the Mermaid City",
  "short": "Mermaid City",
  "hero": "Sophia",
  "theme": "mermaid-deep",
  "items": [
    { "id": "ocarina",    "name": "Ocarina",           "desc": "Grandma Seahorse's magic Ocarina. Toot toot!" },
    { "id": "shell-pink", "name": "Pink Music Shell",  "desc": "Found in the Tickly Kelp Forest. It sings a pink note." },
    { "id": "shell-blue", "name": "Blue Music Shell",  "desc": "Found way, WAY up high at the Bubble Vents." },
    { "id": "shell-gold", "name": "Gold Music Shell",  "desc": "A present from Wigglebottom, the best seeker in the sea." }
  ],
  "pages": [
    {
      "id": "cover", "title": "Cover", "scene": "cover", "fx": "bubbles",
      "alt": "Mermaid Sophia, Luna and Ruby wave in front of a glowing city under the sea. A baby seahorse in tiny glasses zooms by, and a purple tentacle curls in from the edge.",
      "text": [
        "A splashy, bubbly, giggly adventure.",
        "Tap the sound words to hear them. Tap glowing treasures to put them in your bag!"
      ]
    },
    {
      "id": "splash", "title": "Splash!", "chapter": { "n": 1, "title": "Splash Down!" },
      "scene": "splash", "theme": "mermaid-lagoon", "fx": "bubbles",
      "alt": "The three princesses hold hands as they dive under the waves. Their legs have turned into shiny mermaid tails.",
      "text": [
        "The Sparkle Swords were at the beach. Princess {name}. Princess Luna. Princess Ruby.",
        "They held hands. They counted. {say:“One… two… THREE!”}",
        "{sfx:splash|SPLASH!}",
        "Down they went. Down, down, down. {sfx:glub|GLUB-GLUB!}",
        "Then their legs went {sfx:twinkle|SHIMMER!} They had mermaid tails!"
      ]
    },
    {
      "id": "pip", "title": "Meet Pip", "scene": "pip", "theme": "mermaid-lagoon", "fx": "bubbles",
      "pickup": { "item": "ocarina", "x": 455, "y": 300, "size": 96 },
      "alt": "A baby seahorse with tiny round glasses talks very fast. A glowing ocarina floats in front of the princesses.",
      "text": [
        "Something tiny zipped by. {sfx:whoosh|ZWOOP!}",
        "It was a baby seahorse. He wore teeny, tiny glasses.",
        "{pip:“Hi-hello-hiya! I'm Pip! Are you heroes? You look like heroes. Heroes have crowns. You have crowns!”}",
        "Pip pushed up his glasses. {sfx:boop|BOOP.} {pip:“Grandma Seahorse said, give this to a hero. Here!”}",
        "Tap the Ocarina to put it in your bag!"
      ]
    },
    {
      "id": "gates", "title": "The Gates", "chapter": { "n": 2, "title": "The Gates Are Shut" },
      "scene": "gatesShut", "fx": "bubbles",
      "alt": "Mermaid City glows behind a pair of huge gates that are shut tight. Pip and the princesses stare at them.",
      "text": [
        "Pip zoomed ahead. {pip:“Follow me! Mermaid City is the best! It has bubble slides! It has jellyfish lamps! It has—”}",
        "{sfx:clank|CLANK!}",
        "The big city gates were shut. Shut tight. Shut super-duper tight.",
        "{say:“Uh-oh,”} said Luna."
      ]
    },
    {
      "id": "squish", "title": "SQUISH", "scene": "squish", "fx": "bubbles",
      "alt": "Purple ink puffs drift past the shut gates, and a long purple tentacle sneaks in from the side. Ruby, Sophia and Luna look around in surprise.",
      "text": [
        "Then they heard a sound. {sfx:squish|SQUISH.}",
        "And another sound. {sfx:squish|SQUISH. SQUISH.}",
        "Purple ink puffed by. A cookie went missing. Somebody's hat went missing!",
        "{pip:“It's the Big Squishy Thing! It's been bumping around ALL week! Everybody's hiding!”}",
        "Ruby's eyes went wide. Then she put her hands on her hips. {say:“Not us!”}"
      ]
    },
    {
      "id": "lock", "title": "Three Shells", "scene": "lock", "fx": "glow",
      "alt": "A close-up of the gate lock. It has three empty round holes. Sophia looks closely while Pip points at it.",
      "text": [
        "Pip pointed at the lock. It had three empty holes. {sfx:boop|BOOP.}",
        "{pip:“To open the gates, you play the Gate Song! But the song lives in three Music Shells. And the Big Squishy Thing knocked them ALL over the place!”}",
        "Three shells. One song. One brave band.",
        "{shout:SPARKLE SWORDS, LET'S GO!}"
      ]
    },
    {
      "id": "kelp", "title": "Tickly Kelp", "chapter": { "n": 3, "title": "The Tickly Kelp Forest" },
      "scene": "kelp", "theme": "mermaid-lagoon", "fx": "bubbles",
      "pickup": { "item": "shell-pink", "x": 122, "y": 282, "size": 84 },
      "alt": "The princesses giggle as tall wiggly kelp tickles them. A pink shell glows between the kelp.",
      "text": [
        "First stop: the Kelp Forest.",
        "The kelp was tall. The kelp was wiggly. The kelp was… {sfx:giggle|TICKLY!}",
        "{say:“Hee-hee! Stop it, kelp!”} giggled Luna. Ruby laughed so hard she snorted. {sfx:snort|SNORT!}",
        "And in the tickliest spot of all, something glowed pink. Tap the Pink Music Shell!"
      ]
    },
    {
      "id": "bubbles", "title": "Bubble Bounce", "chapter": { "n": 4, "title": "Bubble Bounce" },
      "scene": "vents", "fx": "bubbles",
      "pickup": { "item": "shell-blue", "x": 640, "y": 92, "size": 80 },
      "alt": "Big bubbles puff out of rocky vents. The princesses bounce on them toward a blue shell high above.",
      "text": [
        "Next stop: the Bubble Vents. {sfx:bloop|BLOOP!} {sfx:bloop|BLOOP! BLOOP!}",
        "The blue shell was stuck way, WAY up high.",
        "{say:“I've got an idea!”} said {name}. She bounced on a bubble. {sfx:boing|BOING!}",
        "Luna bounced higher. Ruby bounced the HIGHEST! Tap the Blue Music Shell!"
      ]
    },
    {
      "id": "cave", "title": "The Dark Cave", "chapter": { "n": 5, "title": "The Dark, Dark Cave" },
      "scene": "caveEyes", "fx": "glow",
      "alt": "A dark cave. Two big yellow eyes glow inside. Pip's glasses fog up, and the princesses peek in.",
      "text": [
        "Last stop: the Dark, Dark Cave.",
        "It was dark. It was quiet. Pip's glasses fogged up. {pip:“I'm not scared! I'm just… cleaning my glasses.”}",
        "Then two big eyes opened in the dark. {sfx:blink|BLINK. BLINK.}",
        "{whisper:Who's there?}"
      ]
    },
    {
      "id": "octopus", "title": "The Big Squishy Thing", "scene": "octopusGrumpy", "fx": "bubbles",
      "alt": "A giant purple octopus with a grumpy face and eight wiggly arms comes out of the cave holding a gold shell.",
      "text": [
        "{sfx:squish|SQUIIISH!}",
        "Out came eight wiggly arms. One giant head. One VERY grumpy face.",
        "It was an octopus! The Big Squishy Thing! And he was holding the last Music Shell. The gold one.",
        "{say:“HMPH,”} said the octopus."
      ]
    },
    {
      "id": "why", "title": "Why So Grumpy?", "scene": "octopusSad", "fx": "bubbles",
      "alt": "Sophia swims up close to the octopus. He has one big tear in his eye.",
      "text": [
        "The Sparkle Swords did NOT swim away. {name} swam closer.",
        "{say:“Why are you so grumpy?”}",
        "The octopus sniffled. {say:“Everybody swims away from me. I just want someone to play hide-and-seek with!”}",
        "{name} smiled a big smile. {say:“We'll play with you!”}"
      ]
    },
    {
      "id": "hide", "title": "Hide-and-Seek", "scene": "hideSeek", "fx": "bubbles", "focus": "50% 25%",
      "alt": "The octopus hides behind a rock, but his head and all eight arms stick out. The princesses giggle.",
      "text": [
        "{say:“Ready or not, here we come!”}",
        "The octopus hid behind a rock. A big rock. But he was a BIGGER octopus!",
        "One arm stuck out. Two arms stuck out. EIGHT arms stuck out!",
        "{say:“We see you!”} {sfx:giggle|HEE-HEE!} The octopus laughed so hard he blew ink bubbles. {sfx:hoohoo|HOO-HOO-HOO!}"
      ]
    },
    {
      "id": "wigglebottom", "title": "Wigglebottom", "scene": "octopusHappy", "fx": "sparkles",
      "pickup": { "item": "shell-gold", "x": 572, "y": 215, "size": 84 },
      "alt": "Wigglebottom smiles a huge smile with the princesses and holds out the gold shell. Pip does a happy loop-the-loop.",
      "text": [
        "{say:“That was the BEST game ever!”} said the octopus. {say:“My name is Wigglebottom. This is for you.”}",
        "{pip:“Wigglebottom? WIGGLEBOTTOM! Best name ever!”} said Pip.",
        "Tap the Gold Music Shell!",
        "{divider}"
      ]
    },
    {
      "id": "song", "title": "The Gate Song", "chapter": { "n": 6, "title": "The Gate Song" },
      "scene": "gateSong", "fx": "glow",
      "ocarina": { "tune": ["pink", "blue", "gold", "blue", "pink"] },
      "alt": "Back at the gates, three shells glow in the lock. Sophia lifts the ocarina.",
      "text": [
        "Back at the gates, the three shells clicked into the lock. {sfx:click|CLICK! CLICK! CLICK!}",
        "{name} lifted the Ocarina. Pip whispered the song. {pip:“Pink, blue, gold, blue, pink!”}"
      ]
    },
    {
      "id": "open", "title": "WHOOSH!", "scene": "gatesOpen", "fx": "sparkles",
      "alt": "The gates swing open. Golden light and bubbles pour out, and mermaids cheer. Wigglebottom peeks in.",
      "text": [
        "{sfx:whoosh|WHOOOOSH!}",
        "The gates swung open! Light poured out. Bubbles poured out. Mermaids poured out! {say:“HOORAY!”}",
        "Then everybody saw Wigglebottom. {say:“EEK! The Big Squishy Thing!”}",
        "{name} held up her hand. {say:“He's not scary. He's our friend. And he LOVES hide-and-seek.”}"
      ]
    },
    {
      "id": "party", "title": "Hide-and-Seek Party", "scene": "party", "theme": "mermaid-lagoon", "fx": "bubbles",
      "alt": "A big party in Mermaid City. Wigglebottom covers his eyes and counts while everyone hides behind shells, kelp and coral.",
      "text": [
        "So Mermaid City had its very first Hide-and-Seek Party!",
        "Wigglebottom was the seeker. He counted on all eight arms. {say:“One-two-three-four-five-six-seven-EIGHT!”}",
        "He found everybody. He was super good at seeking. {sfx:hoohoo|HOO-HOO!}",
        "{pip:“Best. Day. EVER!”} said Pip. His glasses fell off. {sfx:boop|BOOP.}"
      ]
    },
    {
      "id": "end", "title": "The End", "scene": "goodnight", "fx": "glow",
      "alt": "Mermaid City glows softly at night. The princesses wave goodbye from a balcony, Pip yawns, and Wigglebottom peeks over their shoulders.",
      "text": [
        "When the jellyfish lamps got sleepy, the Sparkle Swords waved goodbye. {sfx:glub|glub-glub…}",
        "{say:“Come back soon!”} called Pip.",
        "{say:“And next time,”} said Wigglebottom, {say:“YOU hide!”}",
        "{huge:The End}"
      ]
    }
  ]
}
;
