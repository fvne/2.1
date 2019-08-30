module.exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return client.functions.noClientPerms(message, message.channel, [ 'Embed Links' ]);

  const member = args[1] ? await client.functions.parseMention(args[1], message.guild, { type: 'member' }).catch(() => false) : message.member;
  if (!member) return client.functions.badArg(message, 1, 'I did not find a member by that query.');

  const row = (await client.query('SELECT * FROM scores WHERE userid = $1 AND guildid = $2', [ member.id, message.guild.id ])).rows[0];
  const points = row ? row.points : 0;
  const level = row ? row.level : 0;
  const reqPoints = client.functions.formatNum(Math.pow((level + 1) / 0.2, 2));
  const { rows: all } = await client.query('SELECT * FROM scores WHERE guildid = $1 ORDER BY points DESC', [ message.guild.id ]);
  const rank = all.indexOf(all.find(r => r.userid === member.id)) + 1;

  const embed = new client.MessageEmbed()
    .addField('XP', `${client.functions.formatNum(points)}/${reqPoints}`, true)
    .addField('Level', client.functions.formatNum(level), true)
    .addField('Rank', `#${rank}`)
    .setColor(client.config.embedColor)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setTitle(`${message.member === member ? 'Your' : `${member.user.tag}'s`} Levelling Information`);

  return message.channel.send(embed);
};

module.exports.help = {
  aliases: [ 'rank' ],
  category: 'Levelling',
  desc: 'Shows levelling information of a user.',
  usage: 'level [Member]'
};