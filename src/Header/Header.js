import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";

const Header = ({
	addItem,
	deleteSelected,
	selectedList,
	list,
	filterHandler,
}) => {
	const [name, setName] = useState([]);

	const handleChange = (select) => {
		console.log(select);
		if (select === "all") {
			return setName(() => ["all"]);
		}
		console.log(select);
		if (name.includes(select)) {
			return setName((prev) =>
				prev.filter((selectName) => selectName !== select)
			);
		}
		if (name.length >= 1) {
			setName((prev) => [...prev, select]);
		} else {
			setName(() => [select]);
		}
	};
	useEffect(() => {
		filterHandler([...new Set(name)]);
	}, [name]);

	return (
		<div className="header">
			<div className="header-col">
				<span>Статус</span>
				<Select size="small" value="" className="selector"></Select>
			</div>
			<div className="header-col">
				<span>Товар</span>
				<Select size="small" value="" className="selector"></Select>
			</div>
			<div className="header-col">
				<span>ID</span>
				<Select size="small" value="" className="selector"></Select>
			</div>
			<div className="name-col">
				<span>Название</span>

				<Select multiple size="small" value={name} className="selector">
					<MenuItem
						onClick={() => handleChange("all")}
						style={{ color: "black", backgroundColor: "white" }}
					>
						Все
					</MenuItem>
					{list.map((item) => {
						return (
							<MenuItem
								key={item.id}
								value={item.name}
								className="select-option"
								onClick={() => handleChange(item.name)}
								style={{ color: "black", backgroundColor: "white" }}
							>
								{name.includes(item.name) ? "*" + item.name : item.name}
							</MenuItem>
						);
					})}
				</Select>
			</div>
			<Tooltip title="Добавить предмет">
				<div onClick={addItem} className="addBtn">
					+
				</div>
			</Tooltip>
			<Tooltip title="Удалить выбранные элементы">
				<div
					onClick={deleteSelected}
					className="deleteSelectedBtn"
					style={{
						visibility: selectedList.length >= 1 ? "visible" : "hidden",
					}}
				>
					X
				</div>
			</Tooltip>
		</div>
	);
};

export default Header;
