import { ConsoleLogger, Injectable} from '@nestjs/common';
import colors from 'colors';
import { appendFileSync } from 'fs';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  formatLog(nome: string, quantidadeDisponivel: number, value: number): string {
    return`LCOAL: ${this.context} - NOME: ${nome} - QUANTIDADE: ${quantidadeDisponivel} - PREÇO: ${value} - TIMESTAMP: ${this.getTimestamp()}`
  }

  logColor(nome: string, quantidadeDisponivel: number, value: number) {
    const logFormat = this.formatLog(nome, quantidadeDisponivel, value);

    console.log(colors.bgMagenta(colors.white(logFormat)))
  }

  logInFile(product) {
    const { nome, quantidadeDisponivel, valor } = product;

    const mensagemFormatada =
    this.formatLog(nome, quantidadeDisponivel, valor) + '\n'; //adicionei a quebra de linha pois o appendFileSync não faz isso automaticamente

    const caminhoDoLog = './src/modulos/customLogger/arquivo.log';
    appendFileSync(caminhoDoLog, mensagemFormatada);
    }
 }
