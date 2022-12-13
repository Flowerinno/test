import React from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({
	deleteHandler,
	selectProduct,
	setStatus,
	nameHandler,
	filteredList,
}) => {
	return (
		<div className="todoList">
			{filteredList.map(({ status, product, id, name }) => {
				return (
					<TodoItem
						status={status}
						product={product}
						id={id}
						name={name}
						key={id}
						deleteHandler={deleteHandler}
						selectProduct={selectProduct}
						setStatus={setStatus}
						nameHandler={nameHandler}
					/>
				);
			})}
		</div>
	);
};

export default TodoList;
