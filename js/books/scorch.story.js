/* Book 3 story: "The Sparkle Swords and Scorch's Little Flame". Everything after the `=` is plain JSON.
   An epic fantasy chapter book for a slightly older listener: a journey, real danger, a mystery, and
   everyone safe (and friends) in the end. About 35-40 minutes aloud; the chapter breaks make good stopping points.
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
        "An epic Sparkle Swords adventure in seven chapters.",
        "Tap the bright sound words as you read. Some of them are LOUD. And if bedtime comes before the end, every new chapter is a good place to stop."
      ]
    },
    {
      "id": "practice", "title": "Sword Practice", "chapter": { "n": 1, "title": "Smoke on the Hill" },
      "scene": "practice", "fx": "sparkles",
      "alt": "In a sunny castle courtyard, Sophia, Ruby and Luna practice a sword dance. Luna's song makes a shining shield, and Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "The morning sun poured over Sparkleton like honey, turning every rooftop and tower bright enough to make you squint. Flags snapped in the breeze. Bakers called out from their windows. And in the castle courtyard, three friends danced in a circle of light, their wooden practice swords flashing. {sfx:clang|CLACK!} Spin. {sfx:twinkle|SPARKLE!}",
        "They were the Sparkle Swords, the bravest band in the whole Kingdom of Sparkleton. Princess Luna could sing a note so pure it turned into a shield of light. Princess Ruby could drum a beat so loud it made the mountains hum. And Princess Sophia had a magic sword that sang whenever she swung it.",
        "“Guard up, Ruby!” called Luna, her voice bright and steady. She twirled, her blue cape spinning around her like a moonbeam, and sang one high, clear note. The air in front of her shimmered gold. Ruby's sword bounced right off it, and Ruby stumbled backward, laughing, her red cape tangled around her boots. “I had it! I totally had it!” She shook the cape loose and raised her sword again. “Okay, okay. One more time.”",
        "Sophia stood to the side, arms crossed, watching with a small smile. In her pocket, something wriggled. She reached in and gave Tiny Grumbo a gentle pat. He had once been a shadow demon as big as a mountain. Now he was small enough to ride in a pocket, and the smallest Sparkle Sword of all. “Not yet, little guy,” she whispered. “Save it for the real trouble.”",
        "From the tallest tower, a bell began to ring."
      ]
    },
    {
      "id": "smoke", "title": "The Scorched Note",
      "scene": "smoke",
      "alt": "A plume of smoke rises over the far hills. A soot-smudged messenger bird has landed on the fountain, and a burned note falls into Sophia's hands while Luna and Ruby look on, worried. Tiny Grumbo peeks out of her pocket.",
      "text": [
        "{sfx:bell|DONG! DONG! DONG!}",
        "The laughter in the courtyard vanished. It wasn't the bright, cheerful chime that called them to breakfast. It was the deep iron warning bell, the one that hadn't rung in a hundred years.",
        "Luna lowered her wooden sword and pointed past the courtyard walls. “Look.” Far beyond the green hills, a thick plume of black smoke was twisting up into the honey-gold sky like a snake. It was coming from the north, where the roads grew rocky and the forests grew deep, from the old stone kingdom of Thornwall.",
        "A moment later, a royal messenger bird tumbled out of the clouds, its feathers smudged with soot. It landed heavily on the edge of the fountain, panting, too tired to fly another inch. Luna scooped up water in her hands and let it drink. Sophia untied the tiny scroll from its leg. The edges of the paper were black and crumbly with ash, and it smelled like a campfire. In shaky, hurried ink were just two words: {b:HELP. DRAGON.} And underneath: {b:Princess Magnolia of Thornwall.}",
        "Ruby read it twice. Then she looked up at the smoke, and for once, she didn't say anything funny at all.",
        "Sophia rolled up the scroll. “Wooden swords down,” she said, her voice steady and clear. “It's time for the real ones.”"
      ]
    },
    {
      "id": "setout", "title": "The King's Blessing",
      "scene": "setout",
      "alt": "In the sunny castle stables, the kind old King in his purple robe hands Sophia a little brass lantern. Luna holds a snack bag, Ruby stuffs a blanket roll into her red pack, and Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "The Sparkle Swords ran straight to the King. He was sitting in his great golden chair, and he read the note three times, stroking his long white beard.",
        "“Thornwall is three days' ride for most travelers,” he said slowly. “But a dragon will not wait three days. You must ride hard, and you must ride together.” He looked at each of them in turn. “Promise me something. A sword is for protecting, not for winning. Find out what that dragon truly wants.” The girls nodded. They didn't understand yet. But they would.",
        "Then they ran to the armory and traded their wooden practice blades for the real ones: swords of starlight steel that gleamed like the night sky. Sophia's hummed the moment she lifted it, the way it always did. It knew there was real trouble too.",
        "They packed fast in the castle stables, where the horses stamped and snorted in the straw. Luna packed her songbook and a little bag of snacks. Ruby stuffed a rolled-up blanket into her pack, along with her drumsticks, three apples, and four cookies (two of them for later). Sophia packed a rope and one very small, very excited passenger. Then the King himself came down to the stables, his purple robe sweeping through the straw, and pressed a little brass lantern into Sophia's hands. “For the dark places,” he said. Tiny Grumbo saluted from her pocket.",
        "Then they swung up onto their swift horses and thundered out through the castle gate, their capes snapping in the wind like banners, as the whole town waved them goodbye. {sfx:hooves|CLOP-CLOP-CLOP!}"
      ]
    },
    {
      "id": "woods", "title": "The Whispering Wood", "chapter": { "n": 2, "title": "The Road to Thornwall" },
      "scene": "woods",
      "alt": "The three princesses ride through a dark forest of tall, twisty trees. Luna sings, and a glowing ribbon of light shows the path ahead.",
      "text": [
        "The road to Thornwall ran straight through the Whispering Wood. The trees there were so tall and so old that their branches knotted together overhead, and the sunlight came through only in thin, dusty beams.",
        "And the trees whispered. Not with words, exactly. More like the rustle of a thousand leaves all trying to say the same thing at once. {sfx:whisper|shhh-hhh-hhh…} Turn back, they seemed to say. Turn back. Fire, fire, fire.",
        "Ruby's horse snorted and stamped. Ruby patted its neck. “It's okay,” she told it, even though her own voice wobbled a little. “Trees can't hurt you. Probably.”",
        "The path grew darker and darker, until they could hardly see their own hands. So Luna began to sing. Her voice was soft at first, then steady and bright, and a ribbon of golden light unrolled from her song and floated ahead of them along the path, like a glowing river showing the way. The whispers grew quiet. One by one, the horses calmed. And the Sparkle Swords rode on through the dark, following Luna's light."
      ]
    },
    {
      "id": "bridge", "title": "The Burned Bridge",
      "scene": "bridge",
      "alt": "Crossing a rushing river on big boulders beside the smoking posts of a burned bridge. Ruby slips, one boot splashing into the water and the horses' reins in her hand, and Sophia grabs her and pulls her up. Luna hums on the stones ahead.",
      "text": [
        "On the far side of the Wood, they came to the Silverrush River. It was wide, and fast, and loud. {sfx:splash|SPLOOSH!} And the old wooden bridge that was supposed to cross it was gone.",
        "All that was left were a few black, smoking stumps. Something had burned it, right down to the water. Something enormous.",
        "“Now what?” said Ruby. Sophia looked up and down the river. Then she pointed. A line of round, slippery stepping stones poked out of the rushing water, all the way to the other side. “We cross like we dance,” she said. “Small steps. Arms out. Eyes on the next stone.”",
        "Sophia went first, sword held out for balance, hopping from stone to stone. Luna went second, humming to keep her steps steady. Ruby went last, leading all three horses by their reins. Halfway across, her boot slipped. She wobbled. She windmilled her arms. Her foot touched the icy water, and then Sophia's hand caught hers and pulled her back up. “Thanks,” Ruby gasped. “That's what Sparkle Swords are for,” said Sophia."
      ]
    },
    {
      "id": "nest", "title": "The Empty Nest",
      "scene": "nest",
      "alt": "At sunset on a rocky hilltop, the princesses find a giant nest of woven branches, scorched black inside. It is empty except for one glowing red-and-gold scale, and Sophia reaches for it while Luna and Ruby peer in.",
      "text": [
        "As the sun began to set, the road climbed up into the rocky hills. Near the top, Sophia's horse stopped so suddenly that she nearly slid off.",
        "In front of them was a nest. But not a bird's nest. This nest was made of whole tree branches, bent and woven together in a ring so big that all three of them could have lain down inside it, head to toe, and still not touched the sides. The ground inside was scorched black. And it was still {b:warm}. Warm like a stone that has sat all day in the sun.",
        "It was empty, except for one thing. In the very middle, something glittered. Sophia climbed down and picked it up. It was a scale, as big as her hand, red at the edges and gold in the middle, like a glowing coal. It was warm too. When she held it, she could almost feel a heartbeat.",
        "“A dragon's nest,” Luna whispered. “But where's the dragon?” Ruby said what they were all thinking: “And why would a dragon leave its nest?” Nobody knew. Sophia tucked the golden scale into her pocket next to Grumbo, and she didn't forget about it. Not for one second."
      ]
    },
    {
      "id": "ride", "title": "Thornwall in Flames",
      "scene": "ride",
      "alt": "Seen from behind, the three princesses stop their horses on a hilltop at sunset. Below them, Thornwall Castle burns as the huge red-and-gold dragon Scorch blasts it with fire, and townspeople hurry into a stone shelter. Luna points at the wall.",
      "text": [
        "They rode on through the night and all the next day, stopping only to rest the horses. The closer they got, the warmer the wind became. The sweet morning air turned hot and dry and smelled of toasted stone, like a campfire that had gotten much, much too big.",
        "At last they crested the final hill. Ruby pulled her horse to a stop and whispered, “Whoa.”",
        "Thornwall Castle sat on a rocky hill below them, gray and strong, with seven stone towers and walls as thick as a house, glowing orange in the heat. Hay carts were burning in the fields. Down in the town, the castle guards were leading the last of the townspeople into the great stone shelter, two by two.",
        "And above it all, wings spread wide enough to cover the sun, was a dragon as big as a ship. Her scales flashed brilliant red at the edges and gold in the middle, exactly like the scale in Sophia's pocket. She took a deep breath, her chest glowing like a furnace, and blasted a roaring river of fire straight at the outer wall. {sfx:fire|FWOOOSH!}",
        "“Everyone's getting to shelter,” Luna called over the roar. Then she squinted at the burning wall. “Wait. Who's still up on the wall?”",
        "Sophia gripped her sword. “Sparkle Swords,” she said. “Let's go.”"
      ]
    },
    {
      "id": "magnolia", "title": "Princess Magnolia", "chapter": { "n": 3, "title": "Fire at Thornwall" },
      "scene": "magnolia",
      "alt": "Looking up a steep stone staircase inside the burning castle wall: at the top, Princess Magnolia, with a long golden braid, a silver circlet and a green cloak, draws an arrow as the dragon Scorch circles in the smoky sky. Sophia, Luna and Ruby charge up the steps, swords in hand.",
      "text": [
        "On top of the wall stood a girl in a green cloak, a long golden braid swinging down her back. She was a little older than the Sparkle Swords, and she held a bow taller than she was. Her cheeks were streaked with soot, and her eyes were fierce.",
        "“Up here!” she shouted, waving them toward the stairs. “I'm Magnolia. I sent the note!”",
        "The Sparkle Swords left their horses in the stable and raced up the stone steps two at a time. From the top of the wall, they could see everything: the burning hay carts, the scorched gate, the empty, frightened streets. And the dragon, circling back for another pass.",
        "“Her name is Scorch,” Magnolia said, drawing an arrow. “Everyone in the north knows that name. She's lived in these hills for a hundred years and never bothered anyone. Then, three days ago, she came out of nowhere and started attacking us. I've been keeping her away from the gate with my arrows. But she keeps coming back.” Her voice cracked, just a little. “And every time, she's angrier.”"
      ]
    },
    {
      "id": "tower", "title": "CRASH!",
      "scene": "tower",
      "alt": "The fierce dragon Scorch smashes an old watchtower with her tail, and stones burst out of it. On the wall, Luna sings a golden dome of light that the falling stones bounce off in sparks, Sophia stands ready with her sword, and Ruby leads Magnolia and the guards down the stairs.",
      "text": [
        "Scorch swooped low over the wall, so close they could feel the heat of her belly. Her long tail swung like a battering ram and smashed straight into the old watchtower. {sfx:crash|CRASH!}",
        "Stones the size of pumpkins rained down. Luna planted her feet and sang. Her voice rang out bright and steady, and a dome of shining light spread over the whole wall like a golden umbrella. The stones bounced off it, one after another. {sfx:boom|BOOM! BOOM!}",
        "“This way!” Ruby grabbed Magnolia's arm and waved to the guards. “Everybody off the wall! Go, go, go!” The guards ran. Ruby ran. Magnolia ran, still looking back over her shoulder at the dragon.",
        "With a long, groaning rumble, the tower leaned, and leaned, and toppled sideways into the empty moat. Dust billowed up everywhere, thick and choking. When it finally cleared, Ruby counted heads, the way the Sparkle Swords always did. Every single guard was there. Everyone was safe. Nobody had been underneath it."
      ]
    },
    {
      "id": "toot", "title": "Tiny Grumbo",
      "scene": "toot",
      "alt": "Scorch roars fire over the castle wall as everyone dives flat. Sophia hits the stones with Luna diving behind her, and Tiny Grumbo tumbles out of Sophia's pocket toward a dented knight's helmet.",
      "text": [
        "Scorch wheeled around in the sky and breathed again. A river of fire roared over the wall, so hot that the air shimmered and the stones glowed orange. {sfx:fire|FWOOOSH!} Everyone dove flat behind the battlements.",
        "Sophia hit the ground hard. Her pocket bounced. And out popped Tiny Grumbo, tiny gold crown first.",
        "He flew through the air, turned one perfect somersault, and landed, {sfx:clang|PLINK!}, right inside a guard's dented helmet that had rolled across the stones.",
        "For a moment, it was perfectly quiet. The fire faded. The smoke drifted. Grumbo peeked over the rim of the helmet. He looked up at the enormous dragon. The enormous dragon looked down at Grumbo.",
        "Then Grumbo did the only thing he could think of. He took the deepest breath his tiny body could hold, and he let out one huge, enormous, trumpeting {sfx:toot|TOOT!}"
      ]
    },
    {
      "id": "laugh", "title": "The Dragon Laughs",
      "scene": "laugh",
      "alt": "Scorch hovers above the castle wall, laughing so hard her eyes water, with two puffs of smoke from her nostrils. Below, Tiny Grumbo peeks over a dented knight's helmet as his tiny crown tumbles off, while Sophia, Luna, Ruby and Magnolia stare in amazement.",
      "text": [
        "Scorch froze in midair. Two little puffs of smoke drifted out of her nostrils, and her golden eyes went very, very wide.",
        "Then a sound began deep in her chest, low and rumbling, like thunder rolling across the hills. Her shoulders shook. Her wings wobbled. Her long tail thumped against the castle wall so hard that dust fell from the cracks. Scorch, the most fearsome dragon in the north, was {b:laughing}. {sfx:dragon-laugh|HAW-HAW-HAW!}",
        "For one whole second, there was no fire at all. Just a dragon, laughing so hard her eyes watered.",
        "Ruby stared at the helmet, then at Grumbo, then at the dragon, then back at Grumbo. “You,” she said slowly, “made the dragon {b:laugh}.” Grumbo bowed so low his crown fell off.",
        "Magnolia lowered her bow, amazed. “Three days,” she whispered. “Three days I've been fighting her, and I never knew she could laugh.”"
      ]
    },
    {
      "id": "talk", "title": "Talking Isn't Enough",
      "scene": "talk",
      "alt": "Sophia lowers her sword and steps toward the huge dragon Scorch with one hand held out, while smoke curls from the dragon's jaws. Luna, Ruby and Magnolia crouch inside Luna's glowing shield, and Luna reaches out to pull Sophia back. Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "Sophia saw her chance. If the dragon could laugh, maybe it could listen. She remembered the King's words: {b:find out what that dragon truly wants}. So she lowered her sword and stepped out from behind the stones, one hand held out.",
        "“Scorch,” she called, as calmly as she could, though her heart was pounding like Ruby's drum. “We don't want to fight you. We came a long way to help. Just tell us what you need.”",
        "For a heartbeat, the dragon's golden eyes locked on hers. Something flickered in them. Something that looked almost like hope. Then Scorch turned her head and stared past Sophia, at the castle, at the tall towers, and the hope turned to fury. She threw back her head and roared. {sfx:dragon-roar|RAAAAWR!} Fire came pouring over the wall again.",
        "Luna dragged Sophia back behind her shield just in time. The four girls crouched together, breathing hard, while the fire roared above them. “Talking isn't enough,” Sophia said. “Not yet. We're going to have to protect Thornwall. And we're going to have to find out why she's fighting.”"
      ]
    },
    {
      "id": "crack", "title": "CRACK!", "chapter": { "n": 4, "title": "The Battle of Thornwall" },
      "scene": "crack",
      "alt": "Scorch's fire slams into Luna's glowing bubble shield, and a jagged crack splits across it. Luna sings through gritted teeth, Ruby beats out a spark on her cape, and Sophia, knocked to her knees with a scraped knee and watery eyes, looks up bravely as Magnolia reaches down to help her. Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "The battle of Thornwall began.",
        "Scorch's next blast hit Luna's shield head-on. The light shuddered and groaned. Then a long, jagged line split across it. {sfx:crack|CRACK!} Luna gasped, but she kept singing.",
        "A spark leapt onto Ruby's cape and caught, glowing orange. Ruby yelped, beat it out with her bare hands, and kept pulling Magnolia toward the steps. A burning beam crashed down beside Sophia and knocked her flat. She skidded across the rough stone and scraped her knee, hard.",
        "It stung. It really, really stung. Sophia's eyes watered, and for one second she wanted to stay right there on the ground and cry.",
        "Then she looked up. Luna was still singing, even with a cracked shield. Ruby was still standing, even with a scorched cape. And Magnolia was already reaching down a hand. Sophia took it, gritted her teeth, and stood up. The fire was dangerous. The dragon was enormous. But her friends were right beside her, and that was the bravest feeling in the world."
      ]
    },
    {
      "id": "together", "title": "No One Fights Alone",
      "scene": "together",
      "alt": "The four girls fight as a team. Ruby grins and drums on a fallen shield so Scorch turns toward her, Luna holds a glowing shield over the guards, Sophia leaps to knock a falling stone aside with Tiny Grumbo in her pocket, and Magnolia shoots arrows into the ground to mark a safe path for a baker, a blacksmith and a grandmother carrying a goose.",
      "text": [
        "“Remember the sword-dance?” Sophia called. “Just like practice! Everybody, positions!”",
        "Ruby grinned, a wild, brave grin. She pulled two drumsticks from her belt and beat them on a fallen shield. {sfx:boom|BOOM-BA-BOOM!} The sound echoed off every wall in Thornwall. Scorch's head swung toward the noise, away from the gate, exactly where Ruby wanted it.",
        "Luna sang her shield bright again, crack and all, and held it over the guards like a glowing roof. Sophia leapt from stone to stone, her sword singing as she swung it, knocking falling rocks aside before they could hit anyone. {sfx:swish|SWISH! CLANG!}",
        "And Magnolia fired arrow after arrow, faster than anyone had ever seen. {sfx:arrow|THWIP! THWIP!} But not at the dragon. Into the ground. Each arrow stood up in the dirt like a little flag, marking a safe path through the smoke to the great stone shelter. One by one, the last townspeople followed the arrows inside: a baker, a blacksmith, a grandmother carrying a goose.",
        "Four girls. Four different kinds of brave. And no one fought alone."
      ]
    },
    {
      "id": "arrow", "title": "Magnolia's Arrow",
      "scene": "arrow",
      "alt": "Princess Magnolia lowers her bow with a proud little smile. Her arrow has looped a torn green banner around the edge of Scorch's wing and tied it tight to a tall flagpole, and the startled dragon lurches in the smoky sky. Sophia stares up in amazement, her sword in hand and Tiny Grumbo in her pocket.",
      "text": [
        "Scorch rose high above the courtyard, higher than the tallest tower, and drew in a breath so big her whole chest glowed orange, like a furnace. Everyone knew what was coming next. A blast that big could melt the castle gate.",
        "“Magnolia!” Sophia shouted. “Can you stop her? Without hurting her?” Magnolia narrowed her eyes. “Watch me.”",
        "She didn't aim at the dragon. She aimed at the torn green banner flapping from the flagpole beside Scorch's wing. She held her breath. She let the arrow fly. {sfx:arrow|THWIP!} It caught the banner and carried it in a perfect loop, and the banner wrapped around the edge of Scorch's wing and pinned it tight to the pole.",
        "Scorch lurched. The glow in her chest went out. Her free wing beat wildly. Then she tipped sideways and tumbled down, down, down into the courtyard. {sfx:crash|THUD!}",
        "Luna threw her cracked shield underneath to soften the fall. It caught the dragon like a net, then burst into a shower of golden sparkles. Scorch lay still in the dust, panting. She was shaken. But she was not badly hurt."
      ]
    },
    {
      "id": "gaze", "title": "The Glowing Window",
      "scene": "gaze",
      "alt": "In the dim, smoky courtyard, Sophia steps carefully toward the enormous dragon, her sword pointed down and a golden glow shining from her pocket. Scorch isn't looking at her. She lies in the dust, gazing up with sad, lonely eyes at a tall tower where a warm golden light glows behind an iron-grilled window.",
      "text": [
        "The courtyard went very quiet. Sophia walked toward the dragon slowly, sword ready, one careful step at a time. Up close, Scorch was even bigger than she looked in the sky. Her breath was hot and smelled like woodsmoke. Her scales were red at the edges and gold in the middle, like coals in a fireplace.",
        "Sophia waited for a snap. Or a roar. Neither came.",
        "Scorch wasn't even looking at her. The dragon was staring past the Sparkle Swords, up at the tallest tower of Thornwall Castle: the treasure tower. Behind its locked iron window, something glowed. Softly. Warmly. On and off, on and off, like a heartbeat.",
        "In Sophia's pocket, the golden scale grew warm. Then warmer. On and off, on and off. In time with the light in the window.",
        "And Scorch made a sound Sophia had never heard a dragon make. It was small, and sad, and lonely. Almost like a whimper."
      ]
    },
    {
      "id": "egg", "title": "Scorch's Secret",
      "scene": "egg",
      "alt": "Sophia holds up the glowing dragon scale and lowers her sword, her eyes full of tears as she understands at last. Magnolia points up at the treasure tower, and Luna and Ruby cover their mouths in shock. Beside them, the huge dragon Scorch gazes at the glowing window, one tear rolling down her cheek.",
      "text": [
        "Sophia pulled out the golden scale. It was pulsing with light now, in the very same rhythm as the window. And suddenly she remembered the empty nest in the hills. Still warm. Abandoned. Something missing from it.",
        "Magnolia followed the dragon's gaze up to the tower, and her face went pale. “Three days ago,” she said quietly, “our guards found a glowing egg out in the northern hills. A huge one. They thought it might be dangerous, so they brought it here and locked it in the treasure tower.” She swallowed hard. “Three days ago. The same day Scorch came.”",
        "Sophia looked at the tower. Then at the scale in her hand. Then at the dragon lying in the dust, still watching that window like it was the only thing in the whole world.",
        "She lowered her sword all the way to the ground. “She isn't attacking Thornwall,” Sophia said softly. “She never was.” Her eyes filled up. “She's a mom. And her baby got taken away.”",
        "The King had been right. A sword is for protecting. And the one who most needed protecting was locked in a tower."
      ]
    },
    {
      "id": "return", "title": "The Velvet Nest", "chapter": { "n": 5, "title": "Wings Over the Kingdom" },
      "scene": "return",
      "alt": "At sunset, Ruby carefully carries a huge speckled red-and-gold egg on a velvet cushion toward Scorch, who reaches out one gentle claw, two thin curls of smoke rising from her nose. Luna and Magnolia stand in the glowing tower doorway, and Sophia, up on the flagpole, has freed the green banner from the dragon's wing.",
      "text": [
        "Magnolia ran up the tower stairs with the great iron key while Luna held a fresh shield over the doorway, just in case. When the iron door swung open, the whole stairwell filled with warm golden light.",
        "Ruby carried the egg out herself, nestled in a velvet cushion from the treasure room. It was as big as a pumpkin, speckled red and gold, and warm as fresh bread. {sfx:heartbeat|THUMP-THUMP} went something inside it.",
        "Scorch lifted her head. Slowly, carefully, as if the egg were made of soap bubbles, she reached out one enormous claw and drew it close against her chest. Then she curled her whole body around it, wings and tail and all, until only a little golden glow peeked out.",
        "While the dragon held her egg, Sophia climbed the flagpole and gently pulled Magnolia's arrow free. The banner slipped from Scorch's wing. Then Sophia climbed down and held out the golden scale. “I think this is yours,” she said. Scorch looked at the scale. She looked at Sophia. And very gently, she pushed it back into Sophia's hand with the tip of her nose.",
        "The flames in Scorch's nostrils faded to two thin curls of smoke."
      ]
    },
    {
      "id": "flight", "title": "Flying Home",
      "scene": "flight",
      "alt": "At sunset, Scorch soars high over the kingdom with the glowing egg held safe in her claws. Sophia, Ruby, Luna and Magnolia ride on her back, Ruby cheering with her arms in the air and Tiny Grumbo peeking out of Sophia's pocket. Far below, a dark green forest, a silver river and two castles spread out under a pink and gold sky.",
      "text": [
        "Magnolia bowed her head to the dragon. “I'm sorry,” she said. “We thought the tower was the safest place in the kingdom. We were wrong.” Scorch gave a low, tired rumble that seemed to say, “It's okay. You didn't know.”",
        "But Thornwall was full of frightened people who remembered the fire. And Scorch's nest in the hills had been trampled and scorched. Sophia had an idea. High on the hill above Sparkleton was a warm, dry cave, perfect for a dragon. “Come live with us,” she said. “You and your egg. We'll keep you safe.”",
        "Scorch lowered one wing to the ground, like a ramp. Ruby's mouth fell open. “Is she... does she want us to...” She did. The Sparkle Swords climbed onto the dragon's back, and Magnolia climbed up after them, because she wasn't about to let her new friends go without her.",
        "With three mighty beats of her wings, {sfx:wings|WHUMP! WHUMP! WHOOSH!} Scorch leapt into the sky. Thornwall shrank below them. The Whispering Wood became a green blanket. The Silverrush River became a silver ribbon. The sun set gold and pink and purple, and the wind roared, and Ruby screamed with joy the whole way. It was, everyone agreed later, the best ride of their entire lives."
      ]
    },
    {
      "id": "hatch", "title": "A Little Flame",
      "scene": "hatch",
      "alt": "In a warm cave above Sparkleton at night, the egg cracks open and a tiny red-and-gold baby dragon peeks out while the Sparkle Swords sing.",
      "text": [
        "They landed on the hill above Sparkleton just as the first stars came out. The townspeople came running with lanterns, a little frightened at first, until they saw the princesses waving from the dragon's back.",
        "Scorch settled into the warm cave with her egg, and the girls sat outside on the soft grass and sang their welcome song. Luna sang the tune, Ruby tapped the beat on a rock, Magnolia whistled the harmony, and Sophia's sword hummed along. Even Tiny Grumbo joined in, squeaking every note slightly wrong.",
        "The egg rocked. It wobbled. It glowed brighter and brighter. Then: {sfx:crack|CRACK!}",
        "Out peeped a tiny red-and-gold dragon, no bigger than a puppy, with stubby wings and enormous shining eyes. She blinked at the stars. She blinked at the girls. Then she sneezed out one little spark, like a birthday candle.",
        "“Look at her,” Ruby whispered, her hands pressed to her heart. “She's a little flame.” Scorch made a soft, happy rumble, and the girls knew right away that the baby's name was {b:Flicker}."
      ]
    },
    {
      "id": "missing", "title": "Gone Again", "chapter": { "n": 6, "title": "The Lost Little Flame" },
      "scene": "missing",
      "alt": "Scorch panics in Sparkleton, knocking down an empty bell tower and scorching the garden hedges, while townspeople hurry into the stone hall.",
      "text": [
        "For three happy days, Flicker toddled around the cave and tumbled down the grassy hill and chased butterflies she could never catch. And Tiny Grumbo taught her his very favorite game: hide-and-seek. She was terrible at hiding. Her tail always stuck out. Grumbo found her every single time.",
        "On the fourth morning, Sophia woke up and checked her pocket, the way she always did. It was empty. Tiny Grumbo was gone. Then, from the hill, came a sound that made her blood run cold: a dragon, roaring in fear. {sfx:dragon-roar|RAAAAAWR!}",
        "Flicker's nest was empty too. And Scorch had gone wild with fear.",
        "She stormed down into Sparkleton, searching everywhere for her baby, tearing the roofs off sheds and peering into wells. Her tail knocked down the old bell tower. {sfx:crash|CRASH!} Her frightened breath set the garden hedges smoking. Townspeople ran screaming for the stone hall.",
        "Scorch wasn't trying to be bad. She was a mother who had lost her baby, for the second time in a week. And she was much too scared to listen to anyone."
      ]
    },
    {
      "id": "search", "title": "Tiny Footprints",
      "scene": "search",
      "alt": "Magnolia kneels in a garden path, pointing at a trail of tiny scorched footprints, while Sophia, Ruby and Luna lean in and Scorch searches the rooftops in the background.",
      "text": [
        "The Sparkle Swords met in the town square, out of breath. “We have to find Flicker before Scorch burns down half of Sparkleton,” Sophia said. “But where do we even start?”",
        "Magnolia was already kneeling on the garden path, her nose almost touching the dirt. “Every hunter in Thornwall learns to track,” she said. “Deer. Foxes. Lost sheep.” She pointed. “And baby dragons.”",
        "There, in the soft dirt, was a footprint. A tiny one, with three little claws. Then another. Then another. Each one was scorched black around the edges, as if Flicker's feet were just a little too warm for the ground. And right beside them, so small you could barely see them, were the footprints of something even tinier, with round little toes. “Grumbo,” Luna breathed.",
        "The trail wandered everywhere: around the fountain, through the flower beds, under the baker's window (where a cookie had mysteriously disappeared). And it led straight toward the old bandstand at the edge of the square. “They're together,” said Sophia. “They're playing.” Then a shadow fell across the square, and the air grew very hot. Scorch had seen them. And she was coming."
      ]
    },
    {
      "id": "shield", "title": "Hold the Line",
      "scene": "shield",
      "alt": "Luna holds a huge glowing shield over the gardens as dragon fire hammers it and a crack spreads across it. Ruby draws Scorch toward an empty field while Sophia knocks burning branches away.",
      "text": [
        "Scorch landed in the square with a thud that rattled every window in town. She didn't know about the footprints. She only knew her baby was gone, and she was too frightened to see anything else. She breathed, and fire rolled toward the houses.",
        "“Shields up!” cried Sophia. Luna sang a brand-new shield, the biggest she had ever made, stretching wide and bright over the gardens and the rooftops. Ruby sprinted to the empty practice field, drumming as loud as she could. {sfx:boom|BOOM! BOOM! BOOM!} “Over here, Scorch! This way!” Magnolia sent arrows whistling up to snap off burning branches before they could fall. And Sophia ran along the edge of the shield, knocking sparks away with her sword.",
        "Fire hammered against the shield. {sfx:fire|FWOOOSH!} Luna's voice began to tremble. A crack spread across the light, then another, and another, like ice on a frozen pond.",
        "“I can't hold it much longer!” Luna cried, her face shining with sweat. Ruby raced back and pressed her back against Luna's. “Yes, you can,” she said. “We hold it together.” Magnolia put her hand on Luna's shoulder. Then Sophia did too. And the shield, somehow, held."
      ]
    },
    {
      "id": "squeak", "title": "A Tiny Squeak",
      "scene": "squeak",
      "alt": "Behind the cracking shield, Sophia darts toward a pile of cushions under the old bandstand, where a tiny, crooked gold crown pokes out.",
      "text": [
        "But it couldn't hold forever. Cracks ran across the shield everywhere now, and pieces of light were flaking off and drifting away like golden snow. Sophia's arms ached. Her scraped knee throbbed.",
        "Then, in a tiny gap between two roars, she heard it. A small, familiar sound, coming from underneath the old bandstand. {sfx:squeak|squeak!}",
        "Sophia's heart leapt like a frog. “Hold her!” she called to her friends. “Just a little longer!” Ruby and Luna and Magnolia dug in their heels and kept Scorch busy behind the last of the shining shield.",
        "Sophia sprinted across the square, through the drifting smoke, past the scorched flower beds. She ducked under the bandstand, slid on her knees, and skidded to a stop in front of a big pile of old cushions.",
        "Poking out of the very top was a tiny, crooked gold crown."
      ]
    },
    {
      "id": "drum", "title": "The Best Hiding Place", "chapter": { "n": 7, "title": "Friends Forever" },
      "scene": "drum",
      "alt": "Under the cushions, inside an old bass drum, Tiny Grumbo and baby Flicker are curled up together, giggling.",
      "text": [
        "Sophia lifted the cushions one by one, as gently as if she were unwrapping a present. Underneath was an old bass drum lying on its side, left over from some long-ago parade. It was the perfect hiding place.",
        "And curled up inside, cozy as two kittens, were Tiny Grumbo and Flicker. They were giggling so hard they could barely breathe. {sfx:giggle|HEE-HEE-HEE!}",
        "“We were playing hide-and-seek!” squeaked Grumbo proudly, hopping up onto the rim of the drum. “She finally found a good spot! Nobody found us for {b:hours}! We're the best hiders in the whole kingdom!” Then he saw Sophia's face, all smoky and scared and teary, and his little smile wobbled. “Um,” he said. “Was everybody looking for us?”",
        "Sophia let out the biggest breath of her whole life. “Just a little bit,” she said, and laughed, and scooped him up and kissed the top of his crown.",
        "Flicker wriggled out of the drum, completely safe, not a single scale out of place, and went scampering across the square toward her mother as fast as her stubby little legs could go."
      ]
    },
    {
      "id": "hiccup", "title": "One Little Hiccup",
      "scene": "hiccup",
      "alt": "Flicker presses under Scorch's wing and hiccups a tiny puff of flame that leaves a sooty black smudge on the tip of Tiny Grumbo's gold crown, and Scorch laughs.",
      "text": [
        "Scorch saw her baby, and the fire inside her went quiet all at once, like a candle blown out. She lowered her great head all the way to the ground, and Flicker pressed in tight beneath her mother's wing.",
        "Everyone held their breath. Ruby. Luna. Magnolia. The townspeople peeking out of the stone hall. Even the birds on the rooftops.",
        "Then Flicker opened her little mouth and {sfx:hiccup|HIC!} hiccupped. A tiny puff of flame popped out, sailed through the air in a perfect little arc, and landed right on the very tip of Tiny Grumbo's gold crown. It left a sooty black smudge. Just a little one.",
        "“Eep!” squeaked Grumbo, fanning away the smoke with both hands. {sfx:squeak|EEP!}",
        "Scorch's eyes crinkled. Her shoulders shook. And then she laughed, the same big, rumbling, thundery laugh as at Thornwall, until smoke rings floated up over Sparkleton like a string of balloons. {sfx:dragon-laugh|HAW-HAW-HAW!} Then Ruby laughed. Then Luna, and Magnolia, and Sophia, and the townspeople, until the whole square was laughing. The last of Scorch's flames went out. And this time, the fighting stopped for good."
      ]
    },
    {
      "id": "promise", "title": "The Golden Scale",
      "scene": "promise",
      "alt": "In the repaired town square, Scorch bows her head to Sophia, who holds up the glowing golden scale, while Magnolia kneels before the King to become the fourth Sparkle Sword.",
      "text": [
        "The next morning, Scorch lowered her head to everyone she had frightened, in Thornwall and in Sparkleton. She promised, in her low, rumbling way, to use her fire only where it was safe: for warming cold houses in winter, for lighting the lanterns at festivals, and for toasting marshmallows, which Ruby taught her the very first night.",
        "Then she helped rebuild every tower she had knocked down, carrying the heaviest stones in her claws and fitting them into place as gently as a puzzle. The bell tower went up taller than before. The hedges grew back greener.",
        "Sophia still had the golden scale. When she tried to give it back, Scorch shook her head and nudged it toward her again. It glowed warm in Sophia's hand. “It means you're family now,” Magnolia explained softly. “If you ever need her, hold it up and she'll feel it. Wherever she is.”",
        "Then the King stepped forward with a brand-new sword, green-handled and shining. Magnolia knelt, and he touched it to each of her shoulders. {sfx:twinkle|SPARKLE!} “Princess Magnolia of Thornwall,” he said, “for your courage, your kindness, and your truly excellent aim, I name you the fourth Sparkle Sword.”"
      ]
    },
    {
      "id": "end", "title": "The End",
      "scene": "finale", "fx": "sparkles",
      "alt": "At a concert under the stars, Scorch lights the stage with a careful puff of flame while Flicker dances, Tiny Grumbo bows in his smudged crown, and the four Sparkle Swords strike their final pose.",
      "text": [
        "Sophia's knee got a bandage with stars on it. Ruby's cape got a bright new patch shaped like a flame. And Luna's shield, after a long, long sleep, came back brighter than ever.",
        "At the very next concert, the whole kingdom came to watch, and Thornwall too. Magnolia played a silver flute. Scorch lit the stage with one careful puff of flame. {sfx:fire|FWOOSH!} Flicker danced on the drums and hiccupped sparks in time with the music. And Tiny Grumbo took a bow in his sooty gold crown, which he refused to ever, ever polish.",
        "The Sparkle Swords struck their final pose, four swords raised high, while a dragon's golden light filled the night sky. {sfx:twinkle|SPARKLE!}",
        "And somewhere far to the north, in an empty nest in the rocky hills, the wind blew softly through the woven trees... as if it were waiting for the next adventure.",
        "{b:The End.}"
      ]
    }
  ]
}
;
