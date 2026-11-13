/* Book 3 story: "The Sparkle Swords and Scorch's Little Flame". Everything after the `=` is plain JSON.
   An epic fantasy chapter book for a slightly older listener: a journey, real danger, a mystery, and
   everyone safe (and friends) in the end. About 25-30 minutes aloud; the chapter breaks make good stopping points.
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
        "The sun was shining on Sparkleton. Flags flapped. Bakers sang. And in the castle courtyard, three friends were practicing with wooden swords. {sfx:clang|CLACK!} Spin. {sfx:twinkle|SPARKLE!}",
        "They were the Sparkle Swords. Princess Luna could sing a shield of light. Princess Ruby could drum so loud the mountains hummed. And Princess Sophia had a magic sword that sang when she swung it.",
        "“Guard up, Ruby!” called Luna. She twirled and sang one high note. A golden shield popped up. Ruby's sword bounced right off it. Ruby fell down in a tangle of red cape. “I had it!” she said. “I totally had it! One more time.”",
        "Sophia watched and smiled. In her pocket, something wiggled. It was Tiny Grumbo. Once he had been a shadow monster as big as a mountain. Now he was small enough to ride in a pocket. He was the smallest Sparkle Sword of all. “Not yet, little guy,” Sophia whispered. “Save it for real trouble.”",
        "Then, from the tallest tower, a bell began to ring."
      ]
    },
    {
      "id": "smoke", "title": "The Scorched Note",
      "scene": "smoke",
      "alt": "A plume of smoke rises over the far hills. A soot-smudged messenger bird has landed on the fountain, and a burned note falls into Sophia's hands while Luna and Ruby look on, worried. Tiny Grumbo peeks out of her pocket.",
      "text": [
        "{sfx:bell|DONG! DONG! DONG!}",
        "That was not the breakfast bell. That was the warning bell. It had not rung in a hundred years.",
        "Luna pointed past the castle walls. “Look!” Far away, black smoke was curling up into the sky. It came from the north. From the stone kingdom of Thornwall.",
        "Then a messenger bird tumbled out of the sky. Its feathers were sooty. It landed on the fountain, too tired to fly one more inch. Sophia untied the note from its leg. The paper was burned at the edges. It smelled like a campfire. It said: {b:HELP. DRAGON.} And underneath: {b:Princess Magnolia of Thornwall.}",
        "Ruby read it twice. For once, she did not say anything funny.",
        "Sophia rolled up the note. “Wooden swords down,” she said. “It's time for the real ones.”"
      ]
    },
    {
      "id": "setout", "title": "The King's Blessing",
      "scene": "setout",
      "alt": "In the sunny castle stables, the kind old King in his purple robe hands Sophia a little brass lantern. Luna holds a snack bag, Ruby stuffs a blanket roll into her red pack, and Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "The Sparkle Swords ran to the King. He read the note three times. He stroked his long white beard.",
        "“A dragon will not wait,” he said. “Ride fast. Ride together. And promise me something. A sword is for protecting, not for winning. Find out what that dragon really wants.” The girls nodded. They didn't understand yet. But they would.",
        "They swapped their wooden swords for real ones, made of starlight steel. Sophia's sword hummed as soon as she picked it up. It knew there was trouble too.",
        "Then they packed in the castle stables. Luna packed her songbook and some snacks. Ruby packed a blanket, her drumsticks, three apples and four cookies. (Two were for later.) Sophia packed a rope and one very small, very excited passenger. Then the King came down to the stables and gave Sophia a little brass lantern. “For the dark places,” he said. Tiny Grumbo saluted.",
        "They jumped on their horses and galloped out the castle gate. The whole town waved goodbye. {sfx:hooves|CLOP-CLOP-CLOP!}"
      ]
    },
    {
      "id": "woods", "title": "The Whispering Wood", "chapter": { "n": 2, "title": "The Road to Thornwall" },
      "scene": "woods",
      "alt": "The three princesses ride through a dark forest of tall, twisty trees. Luna sings, and a glowing ribbon of light shows the path ahead.",
      "text": [
        "The road to Thornwall went right through the Whispering Wood. The trees were tall and old. Their branches tangled together overhead, so it was dark inside.",
        "And the trees whispered. {sfx:whisper|shhh-hhh-hhh…} Turn back, they seemed to say. Turn back. Fire, fire, fire.",
        "Ruby's horse snorted and stamped. “It's okay,” Ruby told it. Her voice wobbled a little. “Trees can't hurt you. Probably.”",
        "It got darker. And darker. Soon they could hardly see their own hands. So Luna began to sing. A ribbon of golden light floated out of her song and drifted down the path ahead of them. The whispers got quiet. The horses calmed down. And the Sparkle Swords rode on, following Luna's light."
      ]
    },
    {
      "id": "bridge", "title": "The Burned Bridge",
      "scene": "bridge",
      "alt": "Crossing a rushing river on big boulders beside the smoking posts of a burned bridge. Ruby slips, one boot splashing into the water and the horses' reins in her hand, and Sophia grabs her and pulls her up. Luna hums on the stones ahead.",
      "text": [
        "On the other side of the wood was the Silverrush River. It was wide. It was fast. It was loud. {sfx:splash|SPLOOSH!} And the bridge was gone.",
        "All that was left were a few black, smoking posts. Something had burned it. Something big.",
        "“Now what?” said Ruby. Sophia pointed. A row of big round boulders poked out of the water, all the way across. “We cross like we dance,” she said. “Small steps. Arms out. Eyes on the next stone.”",
        "Sophia went first. Luna went second, humming. Ruby went last, leading all three horses. Halfway across, Ruby slipped. She wobbled. She waved her arms like a windmill. Her boot went splash into the icy water. Then Sophia grabbed her hand and pulled her up. “Thanks,” Ruby gasped. “That's what Sparkle Swords are for,” said Sophia."
      ]
    },
    {
      "id": "nest", "title": "The Empty Nest",
      "scene": "nest",
      "alt": "At sunset on a rocky hilltop, the princesses find a giant nest of woven branches, scorched black inside. It is empty except for one glowing red-and-gold scale, and Sophia reaches for it while Luna and Ruby peer in.",
      "text": [
        "As the sun went down, the road climbed into rocky hills. Near the top, Sophia's horse stopped so fast she almost slid off.",
        "In front of them was a nest. Not a bird's nest. A nest made of whole tree branches, bent and woven into a giant ring. All three girls could have lain down inside it and still not touched the sides. The ground inside was burned black. And it was still {b:warm}.",
        "The nest was empty. Almost. In the very middle, something glittered. Sophia picked it up. It was a scale as big as her hand, red on the edges and gold in the middle. It was warm too. It felt almost like a heartbeat.",
        "“A dragon's nest,” Luna whispered. “But where's the dragon?” “And why would a dragon leave its nest?” asked Ruby. Nobody knew. Sophia tucked the scale into her pocket next to Grumbo. She did not forget about it. Not for one second."
      ]
    },
    {
      "id": "ride", "title": "Thornwall in Flames",
      "scene": "ride",
      "alt": "Seen from behind, the three princesses stop their horses on a hilltop at sunset. Below them, Thornwall Castle burns as the huge red-and-gold dragon Scorch blasts it with fire, and townspeople hurry into a stone shelter. Luna points at the wall.",
      "text": [
        "They rode all night and all the next day. The closer they got, the hotter the wind blew. It smelled like a campfire. A much, much too big campfire.",
        "At last they reached the top of the last hill. “Whoa,” whispered Ruby.",
        "Below them sat Thornwall Castle. It had seven stone towers and walls as thick as a house. Hay carts were burning in the fields. Guards were leading the townspeople into a big stone shelter, two by two.",
        "And above it all flew a dragon as big as a ship. Her scales were red on the edges and gold in the middle. Just like the scale in Sophia's pocket. The dragon took a deep breath. Her chest glowed orange. Then she blasted fire at the castle wall. {sfx:fire|FWOOOSH!}",
        "“Everyone's getting to the shelter,” said Luna. Then she squinted. “Wait. Who's still up on the wall?”",
        "Sophia held up her sword. “Sparkle Swords,” she said. “Let's go!”"
      ]
    },
    {
      "id": "magnolia", "title": "Princess Magnolia", "chapter": { "n": 3, "title": "Fire at Thornwall" },
      "scene": "magnolia",
      "alt": "Looking up a steep stone staircase inside the burning castle wall: at the top, Princess Magnolia, with a long golden braid, a silver circlet and a green cloak, draws an arrow as the dragon Scorch circles in the smoky sky. Sophia, Luna and Ruby charge up the steps, swords in hand.",
      "text": [
        "On top of the wall stood a girl in a green cloak. She had a long golden braid and a bow taller than she was. Her cheeks were sooty. Her eyes were fierce.",
        "“Up here!” she shouted. “I'm Magnolia. I sent the note!”",
        "The Sparkle Swords left their horses in the stable. They raced up the stone steps, two at a time. From the top of the wall, they could see everything. The burning carts. The scorched gate. The empty streets. And the dragon, turning around for another try.",
        "“Her name is Scorch,” said Magnolia. “She's lived in these hills for a hundred years. She never bothered anybody. Then, three days ago, she started attacking us. I keep chasing her away from the gate. But she keeps coming back.” Magnolia's voice wobbled. “And every time, she's angrier.”"
      ]
    },
    {
      "id": "tower", "title": "CRASH!",
      "scene": "tower",
      "alt": "The fierce dragon Scorch smashes an old watchtower with her tail, and stones burst out of it. On the wall, Luna sings a golden dome of light that the falling stones bounce off in sparks, Sophia stands ready with her sword, and Ruby leads Magnolia and the guards down the stairs.",
      "text": [
        "Scorch swooped low over the wall. Her tail swung like a giant club and smashed into the old watchtower. {sfx:crash|CRASH!}",
        "Stones as big as pumpkins came tumbling down. Luna planted her feet and sang. A dome of golden light spread over the wall like an umbrella. The stones bounced right off. {sfx:boom|BOOM! BOOM!}",
        "“This way!” yelled Ruby. She grabbed Magnolia's arm and waved to the guards. “Everybody off the wall! Go, go, go!” Everybody ran.",
        "The tower leaned. And leaned. And fell over sideways into the empty moat. Dust puffed up everywhere. When it cleared, Ruby counted heads. Every guard was there. Everyone was safe."
      ]
    },
    {
      "id": "toot", "title": "Tiny Grumbo",
      "scene": "toot",
      "alt": "Scorch roars fire over the castle wall as everyone dives flat. Sophia hits the stones with Luna diving behind her, and Tiny Grumbo tumbles out of Sophia's pocket toward a dented knight's helmet.",
      "text": [
        "Scorch turned around and breathed fire again. {sfx:fire|FWOOOSH!} Everyone dove flat.",
        "Sophia hit the ground hard. Her pocket bounced. And out popped Tiny Grumbo, crown first.",
        "He flew through the air. He did one perfect somersault. And he landed, {sfx:clang|PLINK!}, right inside a dented helmet that had rolled across the stones.",
        "Then everything was quiet. Grumbo peeked over the edge of the helmet. He looked up at the enormous dragon. The enormous dragon looked down at Grumbo.",
        "So Grumbo did the only thing he could think of. He took the biggest breath his tiny body could hold. And he let out one huge, trumpety {sfx:toot|TOOT!}"
      ]
    },
    {
      "id": "laugh", "title": "The Dragon Laughs",
      "scene": "laugh",
      "alt": "Scorch hovers above the castle wall, laughing so hard her eyes water, with two puffs of smoke from her nostrils. Below, Tiny Grumbo peeks over a dented knight's helmet as his tiny crown tumbles off, while Sophia, Luna, Ruby and Magnolia stare in amazement.",
      "text": [
        "Scorch froze in the air. Two little puffs of smoke came out of her nose. Her eyes went very, very wide.",
        "Then her tummy started to rumble. Her shoulders shook. Her wings wobbled. Her tail thumped the wall so hard that dust fell down. Scorch, the scariest dragon in the north, was {b:laughing}. {sfx:dragon-laugh|HAW-HAW-HAW!}",
        "For one whole second, there was no fire at all. Just a dragon, laughing so hard her eyes watered.",
        "Ruby looked at the helmet. Then at Grumbo. Then at the dragon. Then back at Grumbo. “You,” she said slowly, “made the dragon {b:laugh}.” Grumbo bowed so low his crown fell off.",
        "Magnolia lowered her bow. “Three days,” she whispered. “Three days I've been fighting her. I never knew she could laugh.”"
      ]
    },
    {
      "id": "talk", "title": "Talking Isn't Enough",
      "scene": "talk",
      "alt": "Sophia lowers her sword and steps toward the huge dragon Scorch with one hand held out, while smoke curls from the dragon's jaws. Luna, Ruby and Magnolia crouch inside Luna's glowing shield, and Luna reaches out to pull Sophia back. Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "Sophia had an idea. If the dragon could laugh, maybe she could listen. Sophia remembered what the King said: {b:find out what that dragon really wants}. So she lowered her sword. She stepped out from behind the stones and held out her hand.",
        "“Scorch,” she called. Her heart was pounding like Ruby's drum. “We don't want to fight you. We came to help. Tell us what you need.”",
        "For a moment, the dragon looked right at her. Something flickered in her golden eyes. It looked almost like hope. Then Scorch looked past Sophia, up at the castle towers. And the hope turned into anger. She roared. {sfx:dragon-roar|RAAAAWR!} Fire came pouring over the wall again.",
        "Luna yanked Sophia back behind her shield just in time. The four girls huddled together while the fire roared over them. “Talking isn't enough,” said Sophia. “Not yet. First we protect Thornwall. Then we find out why she's fighting.”"
      ]
    },
    {
      "id": "crack", "title": "CRACK!", "chapter": { "n": 4, "title": "The Battle of Thornwall" },
      "scene": "crack",
      "alt": "Scorch's fire slams into Luna's glowing bubble shield, and a jagged crack splits across it. Luna sings through gritted teeth, Ruby beats out a spark on her cape, and Sophia, knocked to her knees with a scraped knee and watery eyes, looks up bravely as Magnolia reaches down to help her. Tiny Grumbo peeks out of Sophia's pocket.",
      "text": [
        "The battle of Thornwall began.",
        "Scorch's next blast hit Luna's shield. The light shook. Then a long, zigzag line split across it. {sfx:crack|CRACK!} Luna gasped. But she kept singing.",
        "A spark landed on Ruby's cape. Ruby yelped and patted it out with her hands. A burning beam crashed down next to Sophia and knocked her flat. She skidded across the stones and scraped her knee.",
        "It stung. It really, really stung. Sophia's eyes filled with tears. For one second, she wanted to stay on the ground and cry.",
        "Then she looked up. Luna was still singing, even with a cracked shield. Ruby was still standing, even with a scorched cape. And Magnolia was reaching down a hand. Sophia took it. She gritted her teeth. And she stood up. The dragon was enormous. But her friends were right beside her. And that was the bravest feeling in the world."
      ]
    },
    {
      "id": "together", "title": "No One Fights Alone",
      "scene": "together",
      "alt": "The four girls fight as a team. Ruby grins and drums on a fallen shield so Scorch turns toward her, Luna holds a glowing shield over the guards, Sophia leaps to knock a falling stone aside with Tiny Grumbo in her pocket, and Magnolia shoots arrows into the ground to mark a safe path for a baker, a blacksmith and a grandmother carrying a goose.",
      "text": [
        "“Remember the sword-dance?” Sophia called. “Just like practice! Everybody, positions!”",
        "Ruby grinned a big, brave grin. She pulled out her drumsticks and banged them on a fallen shield. {sfx:boom|BOOM-BA-BOOM!} Scorch's head swung toward the noise. Away from the gate. Just where Ruby wanted it.",
        "Luna sang her shield bright again, crack and all. She held it over the guards like a glowing roof. Sophia jumped from stone to stone, swinging her singing sword. She knocked falling rocks out of the way. {sfx:swish|SWISH! CLANG!}",
        "And Magnolia shot arrow after arrow. {sfx:arrow|THWIP! THWIP!} But not at the dragon. Into the ground! Each arrow stood up like a little flag. They marked a safe path through the smoke to the stone shelter. The last townspeople followed the arrows inside: a baker, a blacksmith, and a grandma carrying a goose.",
        "Four girls. Four different kinds of brave. And no one fought alone."
      ]
    },
    {
      "id": "arrow", "title": "Magnolia's Arrow",
      "scene": "arrow",
      "alt": "Princess Magnolia lowers her bow with a proud little smile. Her arrow has looped a torn green banner around the edge of Scorch's wing and tied it tight to a tall flagpole, and the startled dragon lurches in the smoky sky. Sophia stares up in amazement, her sword in hand and Tiny Grumbo in her pocket.",
      "text": [
        "Scorch flew up high. Higher than the tallest tower. She took a breath so big her whole chest glowed orange. Uh-oh. A blast that big could melt the castle gate.",
        "“Magnolia!” Sophia shouted. “Can you stop her? Without hurting her?” Magnolia narrowed her eyes. “Watch me.”",
        "She did not aim at the dragon. She aimed at the torn green flag flapping on the flagpole. She held her breath. She let go. {sfx:arrow|THWIP!} The arrow caught the flag and swung it around in a loop. The flag wrapped around Scorch's wing and tied it tight to the pole!",
        "Scorch wobbled. The glow in her chest went out. Her other wing flapped wildly. Then she tipped over and tumbled down, down, down into the courtyard. {sfx:crash|THUD!}",
        "Luna threw her cracked shield underneath her. It caught the dragon like a net. Then it popped into a shower of golden sparkles. Scorch lay in the dust, panting. She was shaken up. But she was not hurt."
      ]
    },
    {
      "id": "gaze", "title": "The Glowing Window",
      "scene": "gaze",
      "alt": "In the dim, smoky courtyard, Sophia steps carefully toward the enormous dragon, her sword pointed down and a golden glow shining from her pocket. Scorch isn't looking at her. She lies in the dust, gazing up with sad, lonely eyes at a tall tower where a warm golden light glows behind an iron-grilled window.",
      "text": [
        "The courtyard got very quiet. Sophia walked toward the dragon. One careful step. Then another. Up close, Scorch was even bigger. Her breath was hot. It smelled like woodsmoke.",
        "Sophia waited for a snap. Or a roar. Neither came.",
        "Scorch was not even looking at her. She was staring up at the tallest tower. The treasure tower. Behind its locked window, something glowed. On and off. On and off. Like a heartbeat.",
        "In Sophia's pocket, the golden scale got warm. Then warmer. On and off. On and off. Just like the light in the window.",
        "And Scorch made a sound Sophia had never heard a dragon make. It was small and sad and lonely. Almost like a whimper."
      ]
    },
    {
      "id": "egg", "title": "Scorch's Secret",
      "scene": "egg",
      "alt": "Sophia holds up the glowing dragon scale and lowers her sword, her eyes full of tears as she understands at last. Magnolia points up at the treasure tower, and Luna and Ruby cover their mouths in shock. Beside them, the huge dragon Scorch gazes at the glowing window, one tear rolling down her cheek.",
      "text": [
        "Sophia pulled out the golden scale. It was blinking now, just like the window. And Sophia remembered the empty nest in the hills. Still warm. Something missing.",
        "Magnolia looked up at the tower. Her face went pale. “Three days ago,” she said quietly, “our guards found a glowing egg in the hills. A huge one. They thought it might be dangerous. So they locked it in the treasure tower.” She gulped. “Three days ago. The same day Scorch came.”",
        "Sophia looked at the tower. Then at the scale. Then at the dragon, still staring at that window.",
        "She lowered her sword all the way down. “She isn't attacking Thornwall,” Sophia said softly. “She never was.” Her eyes filled with tears. “She's a mom. And somebody took her baby.”",
        "The King was right. A sword is for protecting. And the one who needed protecting most was locked in a tower."
      ]
    },
    {
      "id": "return", "title": "The Velvet Nest", "chapter": { "n": 5, "title": "Wings Over the Kingdom" },
      "scene": "return",
      "alt": "At sunset, Ruby carefully carries a huge speckled red-and-gold egg on a velvet cushion toward Scorch, who reaches out one gentle claw, two thin curls of smoke rising from her nose. Luna and Magnolia stand in the glowing tower doorway, and Sophia, up on the flagpole, has freed the green banner from the dragon's wing.",
      "text": [
        "Magnolia ran up the tower stairs with the big iron key. When the door swung open, the whole stairway filled with golden light.",
        "Ruby carried the egg out herself, on a velvet cushion from the treasure room. It was as big as a pumpkin. It was speckled red and gold. It was warm as fresh bread. {sfx:heartbeat|THUMP-THUMP} went something inside.",
        "Scorch lifted her head. Slowly, gently, she reached out one giant claw. She pulled the egg close. Then she curled her whole body around it, until only a little golden glow peeked out.",
        "Sophia climbed the flagpole and pulled Magnolia's arrow free. The flag slipped off Scorch's wing. Then Sophia climbed down and held out the golden scale. “I think this is yours,” she said. Scorch looked at the scale. She looked at Sophia. Then she gently pushed it back into Sophia's hand with her nose.",
        "The fire in Scorch's nose faded to two thin curls of smoke."
      ]
    },
    {
      "id": "flight", "title": "Flying Home",
      "scene": "flight",
      "alt": "At sunset, Scorch soars high over the kingdom with the glowing egg held safe in her claws. Sophia, Ruby, Luna and Magnolia ride on her back, Ruby cheering with her arms in the air and Tiny Grumbo peeking out of Sophia's pocket. Far below, a dark green forest, a silver river and two castles spread out under a pink and gold sky.",
      "text": [
        "Magnolia bowed to the dragon. “I'm sorry,” she said. “We thought the tower was the safest place. We were wrong.” Scorch gave a low rumble. It sounded like, “It's okay. You didn't know.”",
        "But the people of Thornwall were still scared. And Scorch's nest had been trampled. Then Sophia had an idea. On the hill above Sparkleton was a warm, dry cave. Perfect for a dragon. “Come live with us,” she said. “You and your egg. We'll keep you safe.”",
        "Scorch lowered one wing to the ground, like a slide. Ruby's mouth fell open. “Does she want us to... ride her?” She did! The Sparkle Swords climbed onto her back. And Magnolia climbed up too. She was not about to let her new friends go without her.",
        "Scorch flapped her wings three times. {sfx:wings|WHUMP! WHUMP! WHOOSH!} And up they went! Thornwall got smaller and smaller. The Whispering Wood looked like a green blanket. The river looked like a silver ribbon. The sun set gold and pink and purple. Ruby screamed with joy the whole way. It was the best ride ever."
      ]
    },
    {
      "id": "hatch", "title": "A Little Flame",
      "scene": "hatch",
      "alt": "Under a big moon and a sky full of stars, Scorch curls around her speckled red-and-gold egg in a glowing cave above Sparkleton. The egg has cracked open, and a tiny baby dragon peeks out, sneezing a little spark. On the grass, Sophia, Luna, Ruby and Magnolia watch in wonder, Ruby tapping a rock like a drum and Tiny Grumbo peeking out of Sophia's pocket.",
      "text": [
        "They landed on the hill above Sparkleton just as the stars came out. People came running with lanterns. They were scared at first. Then they saw the princesses waving.",
        "Scorch curled up in the warm cave with her egg. The girls sat outside on the grass and sang a welcome song. Luna sang. Ruby tapped a rock like a drum. Magnolia whistled. Sophia's sword hummed along. Tiny Grumbo sang too. He got every note a little bit wrong.",
        "The egg rocked. It wobbled. It glowed brighter and brighter. Then... {sfx:crack|CRACK!}",
        "Out peeked a tiny red-and-gold dragon, no bigger than a puppy. She had stubby wings and big shiny eyes. She blinked at the stars. She blinked at the girls. Then she sneezed out one little spark, like a birthday candle.",
        "“Look at her,” Ruby whispered. “She's a little flame.” Scorch rumbled happily. And the girls knew right away that the baby's name was {b:Flicker}."
      ]
    },
    {
      "id": "missing", "title": "Gone Again", "chapter": { "n": 6, "title": "The Lost Little Flame" },
      "scene": "missing",
      "alt": "Scorch stomps through Sparkleton, frantic with worry, searching for her baby. Her tail smashes the old wooden bell tower and sends the bell flying, she peers down a stone well, and her worried breath sets a hedge smoking while townspeople run for the stone hall.",
      "text": [
        "For three happy days, Flicker toddled around the cave. She rolled down the grassy hill. She chased butterflies. And Tiny Grumbo taught her his favorite game: hide-and-seek. Flicker was terrible at hiding. Her tail always stuck out.",
        "On the fourth morning, Sophia checked her pocket. It was empty. Tiny Grumbo was gone! Then, from the hill, came a terrible sound. A dragon, roaring in fear. {sfx:dragon-roar|RAAAAAWR!}",
        "Flicker was gone too. And Scorch was wild with worry.",
        "She stomped into Sparkleton, looking everywhere for her baby. She pulled the roofs off sheds. She peeked down wells. Her tail knocked over the old bell tower. {sfx:crash|CRASH!} Her worried breath made the hedges smoke. Everybody ran for the stone hall.",
        "Scorch wasn't being bad. She was a mom who had lost her baby. Again. And she was much too scared to listen."
      ]
    },
    {
      "id": "search", "title": "Tiny Footprints",
      "scene": "search",
      "alt": "In the town square, Magnolia kneels and points at a trail of tiny scorched footprints, with even tinier ones right beside them. Sophia, Luna and Ruby lean in to look. The trail leads past the fountain toward the old bandstand, while the dark shape of Scorch swoops over the rooftops.",
      "text": [
        "The Sparkle Swords met in the town square. “We have to find Flicker,” said Sophia. “Fast! But where do we start?”",
        "Magnolia was already kneeling on the garden path. “In Thornwall, we learn to track,” she said. “Deer. Foxes. Lost sheep.” She pointed. “And baby dragons.”",
        "There in the dirt was a tiny footprint with three little claws. Then another. And another. Each one was burned black around the edges. Right next to them were even tinier footprints, with round little toes. “Grumbo!” Luna whispered.",
        "The footprints went everywhere. Around the fountain. Through the flowers. Under the baker's window, where a cookie had disappeared. And they led straight to the old bandstand. “They're together,” said Sophia. “They're playing!” Then a shadow fell over the square. The air got very hot. Scorch had seen them. And she was coming."
      ]
    },
    {
      "id": "shield", "title": "Hold the Line",
      "scene": "shield",
      "alt": "Under a huge golden shield, cracked all over like ice, the four girls stand close together and hold it up as one. Luna sings with all her might, sweat on her brow, while Magnolia, Ruby and Sophia hold on beside her, gritting their teeth. Outside, Scorch blasts fire against the shield.",
      "text": [
        "Scorch landed in the square with a thud that rattled every window. She didn't know about the footprints. She only knew her baby was gone. She breathed, and fire rolled toward the houses.",
        "“Shields up!” cried Sophia. Luna sang the biggest shield she had ever made. It stretched over the gardens and the rooftops. Ruby ran to the practice field, drumming as loud as she could. {sfx:boom|BOOM! BOOM! BOOM!} “Over here, Scorch!” Magnolia shot down burning branches before they could fall. And Sophia ran along the shield, knocking sparks away with her sword.",
        "Fire pounded the shield. {sfx:fire|FWOOOSH!} Luna's voice started to shake. A crack spread across the light. Then another. And another. Like ice on a pond.",
        "“I can't hold it much longer!” cried Luna. Ruby ran back and stood right behind her. “Yes, you can,” Ruby said. “We hold it together.” Magnolia put her hand on Luna's shoulder. So did Sophia. And somehow, the shield held."
      ]
    },
    {
      "id": "squeak", "title": "A Tiny Squeak",
      "scene": "squeak",
      "alt": "Behind the cracking shield, Sophia darts toward a pile of cushions under the old bandstand, where a tiny, crooked gold crown pokes out.",
      "text": [
        "But it couldn't hold forever. Cracks were everywhere now. Bits of light were falling off like golden snow. Sophia's arms ached. Her scraped knee hurt.",
        "Then, in between two roars, she heard it. A tiny sound from under the old bandstand. {sfx:squeak|squeak!}",
        "Sophia's heart jumped like a frog. “Keep her busy!” she called. “Just a little longer!”",
        "Sophia ran across the square, through the smoke. She ducked under the bandstand. She slid on her knees and stopped in front of a big pile of old cushions.",
        "Sticking out of the top was a tiny, crooked gold crown."
      ]
    },
    {
      "id": "drum", "title": "The Best Hiding Place", "chapter": { "n": 7, "title": "Friends Forever" },
      "scene": "drum",
      "alt": "Under the cushions, inside an old bass drum, Tiny Grumbo and baby Flicker are curled up together, giggling.",
      "text": [
        "Sophia lifted the cushions, one by one, like unwrapping a present. Underneath was an old bass drum, lying on its side. The perfect hiding place.",
        "And curled up inside, cozy as two kittens, were Tiny Grumbo and Flicker. They were giggling so hard they could barely breathe. {sfx:giggle|HEE-HEE-HEE!}",
        "“We were playing hide-and-seek!” squeaked Grumbo. He hopped up onto the edge of the drum. “She finally found a good spot! Nobody found us for {b:hours}! We're the best hiders in the whole kingdom!” Then he saw Sophia's face. It was smoky and scared and teary. His smile wobbled. “Um,” he said. “Was everybody looking for us?”",
        "Sophia let out the biggest breath of her whole life. “Just a little bit,” she said. She laughed and scooped him up and kissed his crown.",
        "Flicker wiggled out of the drum, safe and sound. Then she ran across the square to her mom as fast as her stubby legs could go."
      ]
    },
    {
      "id": "hiccup", "title": "One Little Hiccup",
      "scene": "hiccup",
      "alt": "Flicker presses under Scorch's wing and hiccups a tiny puff of flame that leaves a sooty black smudge on the tip of Tiny Grumbo's gold crown, and Scorch laughs.",
      "text": [
        "Scorch saw her baby. All at once, her fire went out, like a candle. She lowered her big head to the ground. Flicker snuggled in tight under her mom's wing.",
        "Everyone held their breath. Ruby. Luna. Magnolia. The townspeople peeking out of the stone hall. Even the birds on the rooftops.",
        "Then Flicker opened her mouth and... {sfx:hiccup|HIC!} A tiny puff of fire popped out. It sailed through the air and landed right on top of Tiny Grumbo's crown. It left a little black smudge.",
        "Grumbo squeaked and fanned away the smoke. {sfx:squeak|EEP!}",
        "Scorch's eyes crinkled. Her shoulders shook. And she laughed her big, rumbly laugh. Smoke rings floated up over Sparkleton like balloons. {sfx:dragon-laugh|HAW-HAW-HAW!} Then Ruby laughed. Then Luna, and Magnolia, and Sophia, and the whole town. The last of Scorch's fire went out. And this time, the fighting stopped for good."
      ]
    },
    {
      "id": "promise", "title": "The Golden Scale",
      "scene": "promise",
      "alt": "In the repaired town square, Scorch bows her head to Sophia, who holds up the glowing golden scale, while Magnolia kneels before the King to become the fourth Sparkle Sword.",
      "text": [
        "The next morning, Scorch bowed her head to everyone she had scared. She promised to only use her fire for good things. For warming houses in winter. For lighting lanterns at festivals. And for toasting marshmallows. (Ruby taught her that one.)",
        "Then she helped fix every tower she had knocked down. She carried the heaviest stones and set them in place, gently, like puzzle pieces. The bell tower went back up, taller than before.",
        "Sophia tried to give back the golden scale. Scorch shook her head and pushed it back to her. “It means you're family now,” Magnolia said. “If you ever need her, hold it up. She'll feel it, wherever she is.”",
        "Then the King stepped forward with a brand-new sword. It had a green handle, and it shined. Magnolia knelt, and the King touched the sword to each of her shoulders. {sfx:twinkle|SPARKLE!} “Princess Magnolia of Thornwall,” he said, “for your courage, your kindness, and your truly excellent aim, I name you the fourth Sparkle Sword!”"
      ]
    },
    {
      "id": "end", "title": "The End",
      "scene": "finale", "fx": "sparkles",
      "alt": "At a concert under the stars, Scorch lights the stage with a careful puff of flame while Flicker dances, Tiny Grumbo bows in his smudged crown, and the four Sparkle Swords strike their final pose.",
      "text": [
        "Sophia's knee got a bandage with stars on it. Ruby's cape got a new patch shaped like a flame. And Luna's shield, after a long, long rest, came back brighter than ever.",
        "Then there was a big concert. The whole kingdom came, and Thornwall too. Magnolia played a silver flute. Scorch lit up the stage with one careful puff of fire. {sfx:fire|FWOOSH!} Flicker danced on the drums and hiccupped sparks to the music. And Tiny Grumbo took a bow in his sooty crown. He refused to ever, ever clean it.",
        "The Sparkle Swords struck their final pose, four swords raised high. {sfx:twinkle|SPARKLE!}",
        "And far to the north, in an empty nest in the rocky hills, the wind blew softly through the branches... as if it were waiting for the next adventure.",
        "{b:The End.}"
      ]
    }
  ]
}
;
