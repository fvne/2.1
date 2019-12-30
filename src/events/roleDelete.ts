import ReknownClient from '../structures/client';
import { MessageEmbed, Role } from 'discord.js';

function sendLog (client: ReknownClient, role: Role) {
  // const permissions = role.permissions.serialize(false);

  const embed = new MessageEmbed()
    .addField('Role Name', client.escMD(role.name))
    // .addField('Permissions', Object.keys(permissions).map(perm => `${perm}: ${permissions[perm as PermissionString]}`).join('\n'))
    .setColor(client.config.embedColor)
    .setFooter(`ID: ${role.id}`)
    .setTimestamp()
    .setTitle('Role Deleted');

  client.functions.sendLog(client, embed, role.guild!);
}

export async function run (client: ReknownClient, role: Role) {
  if (!role.guild?.available) return;

  sendLog(client, role);
}