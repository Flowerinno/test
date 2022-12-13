import "./App.css";
import Header from "./Header/Header";
import TodoList from "./TodoList/TodoList";
import { initialData } from "./data";
import { useState, useCallback, useEffect } from "react";
function App() {
	const [list, setList] = useState(initialData);
	const [selectedList, setSelectedList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);

	const deleteHandler = (id) => {
		setList(list.filter((item) => item.id !== id));
	};
	const addItem = useCallback(() => {
		console.log("test");
		setList((prev) => {
			return [
				{
					status: false,
					product: "xxx-",
					id: prev.length + 1,
					name: "",
				},
				...prev,
			];
		});
	}, []);

	const deleteSelected = () => {
		let newList = list;
		for (let item of newList) {
			for (let selectItem of selectedList) {
				if (item.id === selectItem) {
					newList = newList.filter((itemList) => itemList.id !== selectItem);
				}
			}
		}
		setList(newList);
	};

	const selectProduct = (id) => {
		if (selectedList.includes(id)) {
			setSelectedList((prev) => prev.filter((itemId) => itemId !== id));
			return;
		}

		if (selectedList.length >= 1) {
			setSelectedList((prev) => [...prev, id]);
		} else {
			setSelectedList(() => [id]);
		}
	};

	const setStatus = (status, id) => {
		setList(
			list.map((item) => (item.id === id ? { ...item, status: !status } : item))
		);
	};

	const nameHandler = (name, id) => {
		setList(
			list.map((item) => (item.id === id ? { ...item, name: name } : item))
		);
	};

	const filterHandler = useCallback(
		(name) => {
			console.log(name);
			if (name.length === 0) {
				return setFilteredList(() => list);
			}
			if (name[0] === "all") {
				return setFilteredList(list);
			}
			return setFilteredList(list.filter((item) => name.includes(item.name)));
		},
		[filteredList]
	);

	useEffect(() => {
		setFilteredList(list);
	}, [list]);

	return (
		<div className="app">
			<div className="app-container">
				<Header
					addItem={addItem}
					deleteSelected={deleteSelected}
					selectedList={selectedList}
					list={list}
					filterHandler={filterHandler}
				/>
				<TodoList
					deleteHandler={deleteHandler}
					list={list}
					deleteSelected={deleteSelected}
					selectProduct={selectProduct}
					selectedList={selectedList}
					setStatus={setStatus}
					nameHandler={nameHandler}
					filteredList={filteredList}
				/>
			</div>
		</div>
	);
}

export default App;
