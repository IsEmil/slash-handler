<!-- Title -->
<h1 align="center">Discord Slash Handler</h1>
  <p align="center">
    This is a Discord Bot Slash Handler.
    <br />
</h1>

<!-- Getting Started -->

## 🛠 Getting Started

To get a local copy up and running follow these simple steps.
<br/>

<!-- Installation -->

### **Step 1:** Setup / Installation

1. Clone the repository

```sh
git clone https://github.com/IsEmil/command-handler.git
```

### **Step 2:** Setup / Installation

2. Install NPM packages

```sh
npm install
```

### Configurations

Edit the config.js file and insert your credentials

```js
module.exports = exports = {
    token: '', // your bot token
    clientId: '', // your bot client id
    guildId: '', // the guild id for your slash commands
    globalSlash: true, // if you want to use slash commands globally (true = global, false = guild)

    logsGuildId: '', // the guild id for your bot logs
    logsChannel: '', // the channel id for the logs channel
}
```

<br/>

<!-- License -->
## License

Copyright © 2022 Emil (hi@isemil.me)

Distributed under the MIT License. See `LICENSE` for more information.
