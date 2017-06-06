package kr.or.connect.todo.service;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

import ch.qos.logback.core.net.SyslogOutputStream;
import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	private TodoDao dao;
	
	public TodoService(TodoDao dao){
		this.dao=dao;
	}
	
	public Collection<Todo> findAll(){
		return dao.selectAll();
	}
	
	public Todo create(Todo todo){
		Integer id=dao.insert(todo);
		todo.setId(id);
		return todo;
	}
	
	public boolean update(Todo todo){
		int affected=dao.update(todo);
		return affected==1; 
	}
	
	public boolean delete(Integer id){
		int affected=dao.deleteById(id);
		return affected==1;
		
	}

	public void deleteCompleted() {
		dao.deleteCompleted();
	}
}
