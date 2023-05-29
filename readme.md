[Modrinth]: https://modrinth.com/modpack/natureal
[Modrinth Badge]: https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/available/modrinth_vector.svg
[Modrinth Gallery]: https://modrinth.com/modpack/natureal/gallery
[Modrinth Gallery Badge]: https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/documentation/modrinth-gallery_vector.svg
[Support]: https://encode42.dev/support
[Support Badge]: https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy/social/discord-singular_vector.svg

<img src=".github/asset/badge-lq.png" align="left" id="header">
<div align="right">

# Natureal
### ˈneɪʧərːiul - A content mod pack based on the concept of nature.

[![Modrinth Badge]][Modrinth] [![Modrinth Gallery Badge]][Modrinth Gallery] [![Support Badge]][Support]
</div>

### ⚙️ Features
**Vanilla-styled**
- Focus on what Minecraft does great: nature!
- All-round consistency.
- World generation mods that enhance Minecraft's fantasy aspect

**Auditory improvements**
- Realistic player and entity footsteps
- Additional sounds when interacting with your environment
- Talk with your friends in immersive environments
- Reverb, occlusion, and drip sounds!

**QOL improvements**
- Chat overhaul with spellcheck, emojis, and better suggestions
- Focus on removing repetitive grind
- ...while moving the game's goalposts further!

**Multiplayer**
- Built by players, for (multi)players
- Ability to upload user-generated audio and photos

**Performance improvements**
- Utilizes the CaffeineMC suite of optimization mods
- Utilizes Iris for fast shaders
- Includes safe and lesser-known performance tweaks
- Strives to include performant content mods
- Not lightweight, but not heavyweight either!

**...and more!**

I did not make any of the projects that make this mod pack possible.  
Make sure to give some love to the authors of the projects listed in [/mods](https://github.com/Encode42/Natureal/tree/HEAD/src/pack/mods), [/resourcepacks](https://github.com/Encode42/Natureal/tree/HEAD/src/pack/config/paxi/resourcepacks), and [/shaderpacks](https://github.com/Encode42/Natureal/tree/HEAD/src/pack/shaderpacks)!

### ❔ FAQ
<details>
<summary>
What makes this different from other mod packs?
</summary>

Natureal's goal is to provide the modded experience, without going too far. This means *everything* is immersive and comprehensible in-game. Through consistency and intuition, this mod pack should be enjoyable for all parties!

For example, there's no minimap mod. *Or so you may think!* You must **craft** the minimap instead! The same goes for the topic of zoom mods; use a spyglass for that!

This was inspired by [Crucial 2](https://github.com/VazkiiMods/crucial2)'s ideology — to keep things vanilla. It's essentially the opposite of mod packs like [All The Mods](https://github.com/AllTheMods), which condense a ton of vastly different mods into their pack.
</details>

<details>
<summary>
The game is consistently stuttering! Why?
</summary>

This is likely due to [Java's GC](https://how-java-works.yht.one/) being run.

This is normal, and can be mitigated by allocating more memory to your client. I recommend `6 GB` as a minimum! You can also use [flags.sh](https://flags.sh) to generate a launcher profile using [Aikar's flags](https://docs.papermc.io/paper/aikars-flags) and your specified amount of memory.
</details>

<details>
<summary>
Does this work with OptiFine?
</summary>

No. Nor is this fully* compatible with OptiFine resource packs. Natureal mod pack uses Sodium, Iris, etc.

\* Natureal includes a few mods that add resource pack features from OptiFine, but Natureal itself doesn't aim to be fully OptiFine-compatible.
</details>

<details>
<summary>
If this is a nature mod pack, why are there technology mods?
</summary>

Unfortunately, many of the nature-based replacements for tech mods aren't up to my standards. For example, chest-based storage systems don't have what makes AE2 great in my opinion; crafting patterns. As such, I decided to include a couple of technology mods to fill that gap. The pack's primary focus is still nature, though.

It's your choice whether to use these mods! Alternatives such as Create are provided and supported for those that prefer a more kinetic world.

As for the Dr. Who related mods, they were added by request of the Natureal's testers. Why not?
</details>

<details>
<summary>
How is this mod pack built?
</summary>

If you look at the mod pack's [source code](https://github.com/Encode42/Natureal), you'll notice that it isn't structured like a normal packwiz project!

I've written a wrapper around packwiz to handle additional functionality, such as zip export. You'll need Node.js and PNPM if you'd like to build this yourself using said wrapper, but otherwise, the standard packwiz files are in [`/pack/mods`](https://github.com/Encode42/Natureal/blob/HEAD/src/pack).
</details>
