package com.patikacodejam.grouph.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="schools")
public class School {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String name;
	private String city;
	private String country;
	@OneToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="level_id",nullable=false)
	private Level level;
	
}
