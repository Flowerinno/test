import React, { useState, useRef } from "react";
import "./TodoItem.css";
import { Switch, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { svg } from "../data";

const TodoItem = ({
	status,
	product,
	id,
	name,
	deleteHandler,
	selectProduct,
	setStatus,
	nameHandler,
}) => {
	const [isHovering, setIsHovering] = useState(false);
	const [selected, setSelected] = useState(null);
	const [isBlocked, setIsBlocked] = useState(false);
	const [deleteOpacity, setDeleteOpacity] = useState(1);
	const [isOpenModal, setIsOpenModal] = useState(null);
	const [logo, setLogo] = useState(null);
	const ref = useRef();

	const selectItem = () => {
		setSelected(
			selected === "rgb(110, 109, 109)"
				? setSelected(null)
				: "rgb(110, 109, 109)"
		);
		setIsBlocked(!isBlocked);
		selectProduct(id);
	};

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const keyDownHandler = (e) => {
		if (e.code === "Enter") {
			nameHandler(ref.current.value, id);
			ref.current.blur();
		}
	};

	const open = Boolean(isOpenModal);
	const idOpen = open ? "simple-popper" : undefined;

	const nameItemHandler = (e) => {
		setIsOpenModal(isOpenModal ? null : e.currentTarget);
	};

	return (
		<div
			style={{ backgroundColor: selected, opacity: deleteOpacity }}
			className="todoItem"
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<span className="blockBtn" onClick={selectItem}></span>
			<Switch
				defaultChecked={status}
				size="small"
				color="default"
				onClick={() => setStatus(status, id)}
			/>
			<span className="product">{product}</span>
			<span className="productId">{id}</span>
			<div className="className-container">
				{logo && <img src={logo} alt="logo" style={{ width: 20 }} />}
				<input
					ref={ref}
					onClick={nameItemHandler}
					onKeyDown={keyDownHandler}
					className="nameField"
					placeholder={name}
					type="text"
					autoFocus
					disabled={isBlocked}
				/>
			</div>
			<Popper anchorEl={isOpenModal} id={idOpen} open={open}>
				<Box
					sx={{ border: 0.5, p: 1, bgcolor: "background.paper" }}
					onMouseLeave={() => setIsOpenModal(false)}
				>
					{svg.map((pic, i) => {
						return (
							<img
								key={i}
								src={pic}
								alt="test"
								style={{ width: 20 }}
								onClick={() => setLogo(pic)}
								className="svgPic"
							/>
						);
					})}
				</Box>
			</Popper>

			{!isBlocked && (
				<Tooltip title="Удалить предмет">
					<span
						onClick={() => deleteHandler(id)}
						onMouseEnter={() => setDeleteOpacity(0.5)}
						onMouseLeave={() => setDeleteOpacity(1)}
						className="deleteBtn"
						style={{ visibility: !isHovering ? "hidden" : "visible" }}
					>
						X
					</span>
				</Tooltip>
			)}
		</div>
	);
};

export default TodoItem;
