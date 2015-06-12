package kr.co.elevenst.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
	@RequestMapping("/")
	public ModelAndView index(
			@RequestParam(value = "name", defaultValue = "World") String name) {
		
		System.out.println("adsfasdfa");
		ModelAndView mav = new ModelAndView("index");
		mav.addObject("test", "djkim");
		mav.addObject("test2", "11번가");
		return mav;
	}
}
