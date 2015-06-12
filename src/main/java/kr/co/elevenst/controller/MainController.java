package kr.co.elevenst.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
	@RequestMapping("/greeting")
	public String greeting(
			@RequestParam(value = "name", defaultValue = "World") String name) {
		System.out.println("adsfasdfa");
		return "testasdfasdfsadfasdf";
	}
}
