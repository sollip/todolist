package kr.or.connect.todo.domain;

import java.sql.Timestamp;

public class Todo {
	private Integer id;
	private String todo;
	private Integer completed;
	private Timestamp date;
	
	public Todo(){
		
	}
	public Todo(String todo, Integer completed) {
		//setDate(new Timestamp(System.currentTimeMillis()));
		setCompleted(completed);
		setTodo(todo);
	}
	public Todo(Integer id, String todo, Integer completed, Timestamp date) {
		this(todo,completed);
		setId(id);
	}
	
	
	
	public Integer getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public Integer getCompleted() {
		return completed;
	}

	public void setCompleted(int conpleted) {
		this.completed = conpleted;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "Todo [id=" + id + ", todo=" + todo + ", completed=" + completed + ", date=" + date + "]";
	}
	
	
}
