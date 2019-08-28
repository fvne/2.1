const atob = require('atob');
const btoa = require('btoa');

module.exports.run = (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return client.functions.noClientPerms.run(message, message.channel, [ 'Embed Links' ]);

  const method = args[1] ? args[1].toLowerCase() : null;
  if (!method) return client.functions.noArg.run(message, 1, 'an action to do, either decode / encode.');
  if (method !== 'decode' && method !== 'encode') return client.functions.badArg.run(message, 1, 'The action provided was not a valid choice. It must be either decode or encode.');

  const input = args.slice(2).join(' ');
  if (!input) return client.functions.noArg.run(message, 2, 'an input to decode or encode.');

  const result = method === 'decode' ? atob(input) : btoa(input);
  if (!result) return client.functions.badArg.run(message, 2, 'The input provided was not a valid Base64 string.');
  if (result.length > 2048) return client.functions.badArg.run(message, 2, 'The output was longer than 2048 characters, which is more than a message can hold. Please shorten the input.');

  const embed = new client.MessageEmbed()
    .setColor(client.config.embedColor)
    .setDescription(client.escMD(result))
    .setFooter(`Successfully ${method}d! | Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('Output');

  return message.channel.send(embed);
};

module.exports.help = {
  aliases: [],
  category: 'Utility',
  desc: 'Encodes or decodes into Base64.',
  usage: 'base64 <Encode/Decode> <Input>'
};
