package com.currency.bot;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import okhttp3.MediaType;
import okhttp3.RequestBody;
/**
 * Servlet implementation class currencyConverter
 */
@WebServlet("/currencyConverter")
public class currencyConverter extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static HashMap<String , String> currencyMap = new HashMap<>();
	/**
	 * Default constructor. 
	 */
	public currencyConverter() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	//Reading the parameters sent by Gupshup.
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		 response.setContentType("text/html");
	     String messageobj = request.getParameter("messageobj");
		
	     
		String messageFromUser = null;
		String help = "Please enter the amount and both from and to currency for conversion.\nFollow the format [Amount:From currency-To currency].Example 100:USD-INR";

		try {
			JSONObject message = new JSONObject(messageobj);
			messageFromUser = message.getString("text");
			if(messageFromUser.contains(":")&& messageFromUser.contains("-")){
					String messageToSend = doTheConversion(messageFromUser);
						PrintWriter pw = response.getWriter();
						pw.print(messageToSend);
						pw.close();
						pw.flush();
					
				}else{
					PrintWriter pw = response.getWriter();
					pw.print(help);
					pw.close();
					pw.flush();
				}	

		}catch(Exception ex){
			ex.printStackTrace();
		}
	}

// parsing the message and doing conversion to return the right value.
	private String doTheConversion(String msg) {
		double amount = Double.valueOf(msg.substring(0,msg.indexOf(":")).trim());
		String currency1 = msg.substring(msg.indexOf(":")+1, msg.indexOf("-")).trim().toUpperCase();
		String currency2 = msg.substring(msg.lastIndexOf("-")+1).trim().toUpperCase();
		
		double conversionRate = getRate(currency1,currency2);
		
		double convertedAmount = conversionRate*amount;
		
		String messageToSend = "Amount after conversion::"+convertedAmount+" "+currency2+", approx.";
		
		return messageToSend;
		
	}
	
// calling the currency conversion API 
	private double getRate(String currency1, String currency2) {
		String URL = "http://api.fixer.io/latest?base="+currency1+"&symbols="+currency2;
		double rate = 0;
		try {
			okhttp3.OkHttpClient client = new okhttp3.OkHttpClient();
			okhttp3.Request request = new okhttp3.Request.Builder()
					.url(URL)
					//.addHeader("apikey","472c4973c7824085c00a795d068f49cd")
					.get()
					.build();
			okhttp3.Response response = client.newCall(request).execute();
			String responseBody = response.body().string();
			JSONObject Jobject = new JSONObject(responseBody);
			JSONObject rateObj = Jobject.getJSONObject("rates");
			 rate = rateObj.getDouble(currency2);
			System.out.println(rate);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rate;
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
