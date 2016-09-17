package mrmeeting.cost.servidor;

import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

/**
 * Created by rafa on 17/09/2016.
 */
@Controller
public class ServidorTransparenciaProvider extends CostProvider {
    @Override
    public Double getSalaryByName(String name) {

        return extraiRemuneracao(extraiIdServidor(name));
    }

    private Double extraiRemuneracao(int idServidor){
        String REMUNERACAO_LINHA_CLASS = "remuneracaolinhatotalliquida";
        String COLUNA_VALOR = "colunaValor";
        try {
            URLConnection conn = getBuscaRemuneracaoUrl(idServidor).openConnection();

            // open the stream and put it into BufferedReader
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));

            String inputLine;

            while ((inputLine = br.readLine()) != null) {
                if (inputLine.indexOf(REMUNERACAO_LINHA_CLASS) > 0) {
                    try {
                        while(inputLine.indexOf(COLUNA_VALOR) <= 0){
                            inputLine = br.readLine();
                        }
                        String aux = inputLine.substring(inputLine.indexOf(COLUNA_VALOR) + COLUNA_VALOR.length());
                        aux = aux.substring(aux.indexOf(">") + 1);
                        aux = aux.substring(0, aux.indexOf("</td>")).trim();

                        String salario = aux.trim().replaceAll("\\.","").replace(",",".");
                        System.out.println("Salario: " + salario);
                        br.close();
                        return Double.parseDouble(salario);

                    } catch (Exception e) {
                        System.out.println("Deu ruim no parse do servidor: " + e.getMessage());
                        e.printStackTrace();
                    }
                }
            }
            br.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return 0D;
    }


    private static int extraiIdServidor(String nome) {
        String DETALHA_SERVIDOR = "Servidor-DetalhaServidor.asp?IdServidor=";

        try {
            URLConnection conn = getBuscaServidoresUrl(nome).openConnection();

            // open the stream and put it into BufferedReader
            BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));

            String inputLine;

            while ((inputLine = br.readLine()) != null) {
                if (inputLine.indexOf(DETALHA_SERVIDOR) > 0) {
                    try {
                        String aux = inputLine.substring(inputLine.indexOf(DETALHA_SERVIDOR) + DETALHA_SERVIDOR.length());
                        aux = aux.substring(0,aux.indexOf("\">"));
                        System.out.println("ID: " + aux.trim());
                        br.close();
                        return Integer.parseInt(aux.trim());

                    } catch (Exception e) {
                        System.out.println("Deu ruim no parse do servidor: " + e.getMessage());
                        e.printStackTrace();
                    }
                }
            }
            br.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return 0;
    }

    private static URL getBuscaServidoresUrl(String nome) throws MalformedURLException {
        URL url = null;
        try {
            url = new URL("http://www.portaltransparencia.gov.br/servidores/Servidor-ListaServidores.asp?bogus=1&Pagina=1&TextoPesquisa=" + URLEncoder.encode(nome, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (MalformedURLException me){
            me.printStackTrace();
        }
        return url;
    }
    private static URL getBuscaRemuneracaoUrl(Integer idServidor) throws MalformedURLException {
        URL url = null;
        try {
            url = new URL("http://www.portaltransparencia.gov.br/servidores/Servidor-DetalhaRemuneracao.asp?Op=1&IdServidor=@@ID@@&bInformacaoFinanceira=True".replace("@@ID@@", idServidor.toString()));
        } catch (MalformedURLException me){
            me.printStackTrace();
        }
        return url;
    }

}
