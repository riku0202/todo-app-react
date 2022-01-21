import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { ReactLogo, TrashLogo } from "./Svg";

type Todo = {
  Id: string;
  Todo: string;
  Created: string;
  Updated: string;
};

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const apiClient = axios.create({
    baseURL: "https://example.com/",
  });

  const ref = useRef<HTMLInputElement | null>(null);

  const getTodoList = async () => {
    // 初回Fetch
    const res = await apiClient.get<Todo[]>("/");
    setTodoList(res.data);
  };

  const addTodo = async (todo: string) => {
    const res = await apiClient.post<Todo[]>("/", {
      todo,
    });
    setTodoList(res.data);
  };

  const deleteTodo = async (id: string) => {
    const res = await apiClient.delete<Todo[]>("/", {
      params: {
        id,
      },
    });
    setTodoList(res.data);
  };

  const store = async () => {
    if (ref.current) {
      await addTodo(ref.current.value);
      ref.current.value = "";
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <Style>
        <nav className="title">
          {ReactLogo}
          <h2 className="name">Todo List</h2>
        </nav>
        <div className="contents">
          <form className="add">
            <input
              className="add-form"
              type="text"
              ref={ref}
              placeholder="TODO"
            />
            <button className="add-button" onClick={store}>
              ADD
            </button>
          </form>
          {todoList && (
            <ul className="items">
              {todoList.map((props, index) => (
                <li key={index} className="item">
                  {props.Todo}
                  {props.Id}
                  <label className="trash" onClick={() => deleteTodo(props.Id)}>
                    {TrashLogo}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Style>
    </>
  );
};

const Style = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  .title {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 0 0 20px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    svg {
      height: 40px;
      fill: ${({ theme }) => theme.colors.button};
    }

    .name {
      color: ${({ theme }) => theme.colors.font};
      font-size: 30px;
    }
  }

  .contents {
    margin: 30px 0 0;
    color: ${({ theme }) => theme.colors.font};

    .add {
      display: flex;
      gap: 20px;
      width: 100%;

      .add-form {
        line-height: 17px;
        padding: 10px;
        font-size: 15px;
        color: ${({ theme }) => theme.colors.font};
        width: 100%;
        background-color: ${({ theme }) => theme.colors.form};
        border-radius: 7px;
      }

      .add-button {
        background-color: ${({ theme }) => theme.colors.button};
        font-size: 13px;
        padding: 10px;
        color: ${({ theme }) => theme.colors.font};
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-radius: 7px;

        :hover {
          background-color: ${({ theme }) => theme.colors.hover};
        }
      }
    }

    .items {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      line-height: 18px;
      gap: 10px;
      list-style: none;
      padding: 0;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 7px;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.form};

        .trash {
          cursor: pointer;
          svg {
            height: 20px;
            fill: ${({ theme }) => theme.colors.font};
            :hover {
              fill: ${({ theme }) => theme.colors.trash};
            }
          }
        }
      }
    }

    @media screen and (max-width: 640px) {
      padding: 0 20px 0;
    }

    @media (min-width: 640px) {
      padding: 0 48px 0;
    }
  }
`;
