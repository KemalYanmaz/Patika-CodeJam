package com.patikacodejam.grouph.entities;

import java.sql.Date;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String firstName;
	private String lastName;
	private Date birthDate;
	private Date graduateDate;
    @ElementCollection()
    @CollectionTable(name = "schools", joinColumns = @JoinColumn(name = "id"))
	private List<School> schools;
	

}
