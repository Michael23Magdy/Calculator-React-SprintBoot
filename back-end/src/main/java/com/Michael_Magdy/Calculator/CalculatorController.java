package com.Michael_Magdy.Calculator;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CalculatorController {
    @GetMapping("/calculate")
    public ResponseEntity<Double> calculate(@RequestParam String expression){
        try {
            System.out.println(expression);
            Expression e = new ExpressionBuilder(expression).build();
            return new ResponseEntity<>(e.evaluate(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(0.0, HttpStatus.BAD_REQUEST);
        }

    }
}
