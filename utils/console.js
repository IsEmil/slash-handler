module.exports = {
    /**
     * @param color red | green | yellow | blue | purple | cyan | red_bg | green_bg | blue_bg | purple_bg | cyan_bg | yellow_bg | white_bg
     * @param args things you want to log
     */
    log: function (color, ...args) {
        // adjust text color
        if (color === 'red') { console.log(`\u001b[31m`, ...args, `\u001b[0m`) }
        else if (color === 'green') { console.log(`\u001b[32m`, ...args, `\u001b[0m`) }
        else if (color === 'yellow') { console.log(`\u001b[33m`, ...args, `\u001b[0m`) }
        else if (color === 'blue') { console.log(`\u001b[34m`, ...args, `\u001b[0m`) }
        else if (color === 'purple') { console.log(`\u001b[35m`, ...args, `\u001b[0m`) }
        else if (color === 'cyan') { console.log(`\u001b[36m`, ...args, `\u001b[0m`) }
        // adjust bg color
        else if (color === 'red_bg') { console.log(`\u001b[41m`, ...args, `\u001b[0m`) }
        else if (color === 'blue_bg') { console.log(`\u001b[44m`, ...args, `\u001b[0m`) }
        else if (color === 'purple_bg') { console.log(`\u001b[45m`, ...args, `\u001b[0m`) }
        else if (color === 'cyan_bg') { console.log(`\u001b[46m`, ...args, `\u001b[0m`) }
        // adjust text and bg color for better visibility
        else if (color === 'green_bg') { console.log(`\u001b[42m\u001b[34m`, ...args, `\u001b[0m`) }
        else if (color === 'yellow_bg') { console.log(`\u001b[43m\u001b[34m`, ...args, `\u001b[0m`) }
        else if (color === 'white_bg') { console.log(`\u001b[47m\u001b[34m`, ...args, `\u001b[0m`) }
        // if you didn't specify a color, log everything with default color
        else { console.log(color, ...args) }
    }
};
