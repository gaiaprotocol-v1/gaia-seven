
import { Service } from 'typedi';

@Service()
export default class TokenService {
    async getBalance(interaction: any, currency: any) {
        const target = interaction.options.getUser('user') ?? interaction.user;

        return interaction.reply(`${target.tag} has ${currency.getBalance(target.id)}💰}`)
    }
}