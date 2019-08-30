module.exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('KICK_MEMBERS')) return client.functions.noClientPerms(message, message.channel, [ 'Kick Members' ]);

  if (!args[1]) return client.functions.noArg(message, 1, 'a user to kick.');
  const member = await client.functions.parseMention(args[1], message.guild, { type: 'member' }).catch(() => false);
  const reason = args[2] ? args.slice(2).join(' ') : null;
  if (!member) return client.functions.badArg(message, 1, `I did not find a member by that query (${client.escMD(args[0])}).`);
  if (!member.kickable) return client.functions.badArg(message, 1, 'I do not have enough powers to kick that member. Please check my permissions and my role position. Note that I cannot kick owners.');
  member.kick(reason);
  return message.channel.send(`Successfully kicked member ${client.escMD(member.user.tag)} (ID: ${member.id})${reason ? ` for reason \`${client.escMD(reason)}\`` : ''}.`);
};

module.exports.help = {
  aliases: [],
  category: 'Moderation',
  desc: 'Kicks a user.',
  usage: 'kick <User> [Reason]'
};