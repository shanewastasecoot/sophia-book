/* Book 3 story: "The Sparkle Swords and Scorch's Little Flame". Everything after the `=` is plain JSON.
   A chapter book for a slightly older listener: longer pages, real danger, everyone safe in the end.
   Same page fields and text markup as js/books/mermaid-city.story.js:
     {sfx:sound|LABEL} a tappable sound word   {b:bold}   {whisper:quiet}   "{divider}" a scene break
     {bed|bedtime words|daytime words} picks words by bedtime mode (neither part may contain | or {, so no sound words inside) */
(window.SB.stories = window.SB.stories || {})['scorch'] =
{
  "id": "scorch",
  "title": "The Sparkle Swords and Scorch's Little Flame",
  "short": "Scorch's Little Flame",
  "hero": "Sophia",
  "theme": "ember-dusk",
  "pages": [
    {
      "id": "cover", "title": "Cover", "scene": "cover", "fx": "sparkles",
      "alt": "Sophia, Ruby and Luna stand with shining swords beside Princess Magnolia and her bow. A huge red-and-gold dragon circles above a stone castle, and Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "A Sparkle Swords chapter book.",
        "Tap the bright sound words as you read. Some of them are LOUD."
      ]
    },
    {
      "id": "practice", "title": "Sword Practice", "chapter": { "n": 1, "title": "Smoke on the Hill" },
      "scene": "practice", "fx": "sparkles",
      "alt": "In a sunny castle courtyard, Sophia, Ruby and Luna practice a sword dance. Luna's song makes a shining shield, and Tiny Grumbo claps from Sophia's pocket.",
      "text": [
        "The morning sun poured over Sparkleton like honey, turning every rooftop and tower bright enough to make you squint. In the castle courtyard, three friends danced in a circle of light, their swords flashing. {sfx:clang|CLANG!} Spin. {sfx:twinkle|SPARKLE!}",
        "“Guard up, Ruby!” called Luna. She sang one high, clear note, and the air in front of her shimmered into a shield of light. Ruby's sword bounced right off it.",
        "Ruby stumbled backward, laughing, her red cape tangled around her boots. “I had it! I totally had it!” She shook the cape loose and raised her sword again. “Okay. One more time.”",
        "Sophia led the final pose, sword high, curls bouncing. In her pocket, something wriggled. She gave Tiny Grumbo a gentle pat. “Not yet, little guy,” she whispered. “Save it for the real trouble.”"
      ]
    },
    {
      "id": "smoke", "title": "The Scorched Note",
      "scene": "smoke",
      "alt": "A dark plume of smoke rises over the far hills while a soot-smudged messenger bird swoops down to Sophia with a burned note.",
      "text": [
        "From the tallest tower, a bell began to ring. {sfx:bell|DONG! DONG!}",
        "The three friends turned. Far beyond the green hills, a thick gray plume was climbing into the blue sky, twisting like a snake. Smoke. A lot of it.",
        "Something small and dark tumbled out of the sky toward them. It was a messenger bird, its feathers smudged with soot, a scrap of paper clutched in its feet. It dropped the paper into Sophia's hands and flopped onto the fountain's edge, panting.",
        "The note was burned around the edges. In shaky letters, it said just three words: {b:HELP. DRAGON. —Princess Magnolia of Thornwall.}"
      ]
    },
    {
      "id": "ride", "title": "The Ride to Thornwall",
      "scene": "ride",
      "alt": "The three princesses gallop over the hills toward a gray stone castle. A huge red-and-gold dragon blasts fire at its outer wall.",
      "text": [
        "Nobody said a word. They didn't need to. The Sparkle Swords ran for the stables, swung up onto their swift horses, and galloped out through the castle gate. {sfx:hooves|CLOP-CLOP-CLOP!}",
        "The ride to Thornwall took them over three hills and through one deep, dark forest. The closer they got, the warmer the wind became, and the more it smelled like a campfire that had gotten much too big.",
        "When they crested the last hill, Ruby pulled her horse to a stop and whispered, “Whoa.”",
        "Thornwall Castle sat on a rocky hill, gray and strong. Bells clanged as townspeople hurried inside its stone walls. And above it all, wings spread wide enough to cover the sun, a huge red-and-gold dragon opened its jaws and blasted fire at the outer wall. {sfx:fire|FWOOOSH!}"
      ]
    },
    {
      "id": "magnolia", "title": "Princess Magnolia", "chapter": { "n": 2, "title": "Fire at Thornwall" },
      "scene": "magnolia",
      "alt": "On top of the castle wall, Princess Magnolia, with a long braid and a green cloak, draws her bow and calls down to the Sparkle Swords.",
      "text": [
        "On top of the wall stood a girl in a green cloak, a long golden braid swinging down her back. She held a bow taller than she was, and her cheeks were streaked with soot.",
        "“Up here!” she shouted, waving them toward the stairs. “I'm Magnolia. I sent the note!”",
        "The Sparkle Swords raced up the stone steps two at a time. From the top, they could see everything: the burning hay carts, the scorched gate, the empty fields. And the dragon, circling back for another pass.",
        "“Her name is Scorch,” Magnolia said, nocking an arrow. “She showed up three days ago. I've been keeping her away from the gate, but she keeps coming back. Every time, she's angrier.”"
      ]
    },
    {
      "id": "tower", "title": "CRASH!",
      "scene": "tower",
      "alt": "The dragon's tail smashes an empty watchtower. Stones rain down as Luna's glowing shield covers the wall and Ruby leads the guards to safety.",
      "text": [
        "Scorch swooped low. Her long tail swung like a battering ram and smashed straight into the old watchtower. {sfx:crash|CRASH!}",
        "Stones the size of pumpkins rained down. Luna planted her feet and sang. Her voice rang out bright and steady, and a dome of shining light spread over the wall. The stones bounced off it. {sfx:boom|BOOM! BOOM!}",
        "“This way!” Ruby grabbed Magnolia's arm and waved to the guards. “Everybody off the wall! Go, go, go!”",
        "With a long, groaning rumble, the tower toppled sideways and crashed into the empty moat. Dust billowed up everywhere. When it cleared, Ruby counted heads. Every guard was safe. Nobody had been underneath it."
      ]
    },
    {
      "id": "toot", "title": "Tiny Grumbo",
      "scene": "toot",
      "alt": "Fire roars over the wall as everyone ducks. Tiny Grumbo tumbles out of Sophia's pocket and lands in a guard's helmet.",
      "text": [
        "Scorch wheeled around and breathed again. A river of fire roared over the wall, so hot that the air shimmered. {sfx:fire|FWOOOSH!} Everyone dove flat behind the stones.",
        "Sophia hit the ground hard. Her pocket bounced. And out popped Tiny Grumbo, jellybean-small, paper crown first.",
        "He flew through the air, turned one somersault, and landed — {sfx:clang|PLINK!} — right inside a guard's dented helmet.",
        "For a moment, it was perfectly quiet. Grumbo looked up at the enormous dragon. The enormous dragon looked down at Grumbo. Then Grumbo did the only thing he could think of. He let out one huge, enormous, trumpeting {sfx:toot|TOOT!}"
      ]
    },
    {
      "id": "laugh", "title": "The Dragon Laughs",
      "scene": "laugh",
      "alt": "Scorch the dragon throws back her head and laughs, smoke puffing from her nostrils, while Tiny Grumbo grins in the helmet below.",
      "text": [
        "Scorch froze in midair. Two little puffs of smoke drifted out of her nostrils.",
        "Then a sound began deep in her chest, low and rumbling, like thunder rolling across the hills. Her shoulders shook. Her wings wobbled. Her long tail thumped against the wall. Scorch was {b:laughing}. {sfx:dragon-laugh|HAW-HAW-HAW!}",
        "For one whole second, there was no fire at all.",
        "Ruby stared at the helmet, then at Grumbo, then at the dragon. “You,” she said slowly, “made the dragon {b:laugh}.” Grumbo bowed so low his crown fell off."
      ]
    },
    {
      "id": "talk", "title": "Talking Isn't Enough",
      "scene": "talk",
      "alt": "Sophia lowers her sword and steps toward the dragon with one hand held out, while her friends crouch behind Luna's glowing shield.",
      "text": [
        "Sophia saw her chance. If the dragon could laugh, maybe it could listen. She lowered her sword and stepped out from behind the stones, one hand held out.",
        "“Scorch,” she called, as calmly as she could. “We don't want to fight you. We can help. Just tell us what you need.”",
        "For a heartbeat, the dragon's golden eyes locked on hers. Then Scorch threw back her head and roared. {sfx:dragon-roar|RAAAAWR!} Fire came pouring over the wall again.",
        "Luna dragged Sophia back behind her shield just in time. The four girls crouched together, breathing hard. “Talking isn't enough,” Sophia said. “We're going to have to protect Thornwall, and find out why she's fighting.”"
      ]
    },
    {
      "id": "crack", "title": "CRACK!", "chapter": { "n": 3, "title": "The Battle of Thornwall" },
      "scene": "crack",
      "alt": "A blast of dragon fire hits Luna's glowing shield and it cracks. Sophia is knocked down onto the stone with a scraped knee.",
      "text": [
        "Scorch's next blast hit Luna's shield head-on. The light shuddered. Then a long, jagged line split across it. {sfx:crack|CRACK!}",
        "A spark leapt onto Ruby's cape and caught, glowing orange. Ruby yelped, beat it out with her hands, and kept pulling Magnolia toward the steps. A burning beam crashed down beside Sophia and knocked her flat. She skidded across the stone and scraped her knee, hard.",
        "It stung. It really stung. Sophia's eyes watered, and for one second she wanted to stay right there on the ground.",
        "Then she looked up. Luna was still singing. Ruby was still standing. Magnolia was already reaching down a hand. Sophia took it, gritted her teeth, and stood up. The fire was dangerous. But her friends were right beside her."
      ]
    },
    {
      "id": "together", "title": "No One Fights Alone",
      "scene": "together",
      "alt": "The four girls fight as a team: Ruby draws the dragon away from the gate, Luna holds up her shield, Sophia knocks falling stones aside, and Magnolia's arrows mark a safe path.",
      "text": [
        "“Remember the sword-dance?” Sophia called. “Just like practice!”",
        "Ruby grinned. She grabbed two drumsticks from her belt and beat them on a fallen shield. {sfx:boom|BOOM-BA-BOOM!} Scorch's head swung toward the noise, away from the gate, exactly where Ruby wanted it.",
        "Luna sang her shield bright again, crack and all, and held it over the guards. Sophia leapt from stone to stone, swinging her sword to knock falling rocks aside before they could hit anyone. {sfx:swish|SWISH! CLANG!}",
        "And Magnolia fired arrow after arrow, not at the dragon, but into the ground. {sfx:arrow|THWIP! THWIP!} Each one marked a safe path to the shelter. One by one, the last townspeople followed the arrows inside. No one fought alone."
      ]
    },
    {
      "id": "arrow", "title": "Magnolia's Arrow",
      "scene": "arrow",
      "alt": "Magnolia's arrow pins a torn banner around the edge of the dragon's wing to a flagpole, and Scorch tumbles down into the castle courtyard.",
      "text": [
        "Scorch rose high above the courtyard, drawing in a breath so big her whole chest glowed orange. Everyone knew what was coming next.",
        "Magnolia didn't aim at the dragon. She aimed at a torn banner flapping from the flagpole beside her. She let the arrow fly. {sfx:arrow|THWIP!} It caught the banner, and the banner wrapped around the edge of Scorch's wing and pinned it to the pole.",
        "Scorch lurched. Her other wing beat wildly. Then she tipped sideways and tumbled down into the courtyard. {sfx:crash|THUD!}",
        "Luna threw her cracked shield underneath to soften the fall. It caught the dragon like a net, then burst into a shower of sparkles. Scorch lay still in the dust, panting. She was shaken, but not badly hurt."
      ]
    },
    {
      "id": "gaze", "title": "The Glowing Window",
      "scene": "gaze",
      "alt": "Sophia steps carefully toward the fallen dragon. Scorch isn't looking at her. She is staring at a tall tower where a warm glow pulses behind a locked window.",
      "text": [
        "Sophia walked toward the dragon slowly, sword ready, one step at a time. Up close, Scorch was even bigger. Her scales were red at the edges and gold in the middle, like coals in a fireplace.",
        "Sophia waited for a snap or a roar. Neither came.",
        "Scorch wasn't even looking at her. The dragon was staring past the Sparkle Swords, up at the tallest tower of Thornwall Castle, the treasure tower. Behind its locked iron window, something glowed. Softly. Warmly. On and off, like a heartbeat.",
        "Scorch made a sound Sophia had never heard a dragon make. It was small and sad. Almost like a whimper."
      ]
    },
    {
      "id": "egg", "title": "Scorch's Secret",
      "scene": "egg",
      "alt": "Magnolia points up at the treasure tower while Sophia lowers her sword, understanding at last.",
      "text": [
        "Magnolia followed the dragon's gaze, and her face went pale.",
        "“Three days ago,” she said quietly, “the guards found a glowing egg out in the hills. They thought it might be dangerous, so they brought it here and locked it in the treasure tower.” She swallowed. “We didn't know it belonged to Scorch.”",
        "Sophia looked at the tower. Then at the dragon, lying in the dust, still watching that window.",
        "She lowered her sword all the way down. Now they understood. Scorch had never been trying to destroy Thornwall. She had been trying to get her baby back."
      ]
    },
    {
      "id": "return", "title": "The Velvet Nest", "chapter": { "n": 4, "title": "A Dragon at Home" },
      "scene": "return",
      "alt": "Ruby carries a glowing egg in a velvet nest toward Scorch, who reaches for it with one careful claw. Sophia gently frees the banner from the dragon's wing.",
      "text": [
        "Magnolia ran up the tower stairs with the key while Luna held a fresh shield over the doorway, just in case. When the iron door swung open, the whole stairwell filled with warm golden light.",
        "Ruby carried the egg out herself, nestled in a velvet cushion. It was as big as a pumpkin, speckled red and gold, and warm as fresh bread. {sfx:heartbeat|THUMP-THUMP} went something inside it.",
        "Scorch lifted her head. She reached out one enormous claw, slowly, carefully, as if the egg were made of soap bubbles, and drew it close against her chest.",
        "While the dragon held her egg, Sophia climbed up beside the flagpole and gently pulled Magnolia's arrow free. The banner slipped from Scorch's wing. And the flames in Scorch's nostrils faded to two thin curls of smoke."
      ]
    },
    {
      "id": "hatch", "title": "A Little Flame",
      "scene": "hatch",
      "alt": "In a warm cave above Sparkleton at night, the egg cracks open and a tiny red-and-gold baby dragon peeks out while the Sparkle Swords sing.",
      "text": [
        "Magnolia bowed her head to the dragon. “I'm sorry,” she said. “We thought the tower was the safest place. We were wrong.” Scorch gave a low, tired rumble that seemed to say, “It's okay.”",
        "The Sparkle Swords had an idea. High on the hill above Sparkleton was a warm, dry cave, perfect for a dragon. “Come live with us,” Sophia said. “You and your egg.” So Scorch did.",
        "That night, the girls sat outside the cave and sang their welcome song. Luna sang the tune, Ruby tapped the beat on a rock, and Sophia's sword hummed along. The egg rocked. It wobbled. Then — {sfx:crack|CRACK!}",
        "Out peeped a tiny red-and-gold dragon, no bigger than a puppy, with stubby wings and enormous eyes. It sneezed out one little spark, like a birthday candle. “Look at her,” Ruby whispered. “She's a little flame.” And so the baby dragon was named {b:Flicker}."
      ]
    },
    {
      "id": "missing", "title": "The Empty Nest",
      "scene": "missing",
      "alt": "Scorch panics in Sparkleton, knocking down an empty bell tower and scorching the garden hedges, while townspeople hurry into the stone hall.",
      "text": [
        "For three happy days, Flicker toddled around the cave while Tiny Grumbo taught her his favorite game: hide-and-seek. She was terrible at hiding. Her tail always stuck out. Grumbo found her every time.",
        "On the fourth morning, Sophia woke up and checked her pocket. Empty. Tiny Grumbo was gone. Then from the hill came a sound that made her blood run cold: a dragon, roaring in fear. {sfx:dragon-roar|RAAAAAWR!}",
        "Flicker's nest was empty too. And Scorch had gone wild with fear.",
        "She stormed down into Sparkleton, searching everywhere for her baby. Her tail knocked down the old bell tower. {sfx:crash|CRASH!} Her frightened breath set the garden hedges smoking. Townspeople ran screaming for the stone hall. Scorch wasn't trying to be bad. She was a mother who had lost her baby, and she was too scared to listen to anyone."
      ]
    },
    {
      "id": "shield", "title": "Hold the Line",
      "scene": "shield",
      "alt": "Luna holds a huge glowing shield over the gardens as dragon fire hammers it and a crack spreads across it. Ruby draws Scorch toward an empty field while Sophia knocks burning branches away.",
      "text": [
        "The Sparkle Swords raced into the town square. They had to stop Scorch before the fire reached the houses.",
        "Ruby sprinted toward the empty practice field, drumming as loud as she could. {sfx:boom|BOOM! BOOM! BOOM!} “Over here, Scorch! This way!” Luna sang a brand-new shield, wide and bright, over the gardens and the rooftops. Sophia ran along the edge of it, knocking burning branches away with her sword before they could land on anything.",
        "Fire hammered against the shield. {sfx:fire|FWOOOSH!} Luna's voice wavered. A crack spread across the light, then another, and another, like ice on a pond.",
        "“I can't hold it much longer!” Luna cried. “Yes, you can,” said Ruby, pressing her back against Luna's. “We hold it together.” And somehow, the three of them held on."
      ]
    },
    {
      "id": "squeak", "title": "A Tiny Squeak", "chapter": { "n": 5, "title": "Friends" },
      "scene": "squeak",
      "alt": "Behind the cracking shield, Sophia darts toward a pile of cushions under the old bandstand, where a crooked paper crown pokes out.",
      "text": [
        "The shield was almost gone. Cracks ran across it everywhere, and pieces of light were flaking off like snow. Sophia's arms ached. Her knee throbbed.",
        "Then, in a tiny gap between two roars, she heard it. A small, familiar sound, coming from underneath the old bandstand. {sfx:squeak|squeak!}",
        "Sophia's heart leapt. “Hold her!” she called to her friends. Ruby and Luna dug in their heels and kept Scorch busy behind the last of the shining shield.",
        "Sophia darted across the square, ducked under the bandstand, and skidded to a stop in front of a pile of old cushions. Poking out of the very top was a crooked paper crown."
      ]
    },
    {
      "id": "drum", "title": "The Best Hiding Place",
      "scene": "drum",
      "alt": "Under the cushions, inside an old bass drum, Tiny Grumbo and baby Flicker are curled up together, giggling.",
      "text": [
        "Sophia lifted the cushions one by one. Underneath was an old bass drum lying on its side. It was the perfect hiding place.",
        "And curled up inside, cozy as two kittens, were Tiny Grumbo and Flicker. They were giggling so hard they could barely breathe. {sfx:giggle|HEE-HEE-HEE!}",
        "“We were playing hide-and-seek!” squeaked Grumbo proudly. “She finally found a good spot. Nobody found us for {b:hours}!”",
        "Sophia let out the biggest breath of her whole life. Flicker wriggled out of the drum, completely safe, not a scale out of place, and went scampering across the square toward her mother as fast as her stubby legs could go."
      ]
    },
    {
      "id": "hiccup", "title": "One Little Hiccup",
      "scene": "hiccup",
      "alt": "Flicker presses under Scorch's wing and hiccups a tiny puff of flame that singes the tip of Tiny Grumbo's paper crown, and Scorch laughs.",
      "text": [
        "Scorch saw her baby, and the fire inside her went quiet all at once. She lowered her great head to the ground, and Flicker pressed in tight beneath her mother's wing.",
        "Everyone held their breath. Then Flicker opened her little mouth and {sfx:hiccup|HIC!} hiccupped. A tiny puff of flame popped out, sailed through the air, and singed the very tip of Tiny Grumbo's paper crown.",
        "“Eep!” squeaked Grumbo, patting out the smoke with both hands. {sfx:squeak|EEP!}",
        "Scorch's eyes crinkled. Her shoulders shook. And then she laughed, the same big, rumbling, thundery laugh as at Thornwall, until smoke rings floated up into the sky. {sfx:dragon-laugh|HAW-HAW-HAW!} The last of her flames went out. And this time, the fighting stopped for good."
      ]
    },
    {
      "id": "end", "title": "The End",
      "scene": "finale", "fx": "sparkles",
      "alt": "At a concert under the stars, Scorch lights the stage with a careful puff of flame while Flicker dances, Tiny Grumbo bows in his singed crown, and the Sparkle Swords and Magnolia strike their final pose.",
      "text": [
        "Scorch lowered her head to everyone she had frightened, in Thornwall and in Sparkleton, and promised to use her fire only where it was safe. Then she helped the townspeople rebuild every tower she had knocked down, carrying the heaviest stones herself.",
        "Sophia's knee got a bandage with stars on it. Ruby's cape got a bright new patch. Luna's shield, after a good night's sleep, came back brighter than ever.",
        "At the very next concert, Princess Magnolia sat in the front row, and the Sparkle Swords had two brand-new band members. Scorch lit the stage with one careful puff of flame. {sfx:fire|FWOOSH!} Flicker danced and hiccupped sparks in time with the music. And Tiny Grumbo took a bow in his singed paper crown.",
        "The Sparkle Swords struck their final pose. {sfx:twinkle|SPARKLE!}",
        "{b:The End.}"
      ]
    }
  ]
}
;
