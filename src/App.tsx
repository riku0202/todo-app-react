import liff from "@line/liff/dist/lib";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useLiff } from "./hook/useLiff";
import { ReactLogo, TrashLogo } from "./Svg";
import { Todo } from "./types/todo";

export const App = () => {
  const liffProfile = useLiff();

  const [mockTodoList, setMockTodoList] = useState<Todo[]>([]);

  // const [todoList, setTodoList] = useState<Todo[]>([]);

  const liffUser = useLiff();

  console.log(liffUser);

  const apiClient = axios.create({
    baseURL: "https://example.com/",
  });

  const {
    trigger,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
  }>();

  const getTodoList = async () => {
    // const res = await apiClient.get<Todo[]>("/");
    // setTodoList(res.data);
    console.log("get");
  };

  const addTodo = async (todo: Todo) => {
    // const res = await apiClient.post<Todo[]>("/", {
    //   todo,
    // });
    // setTodoList(res.data);

    // Test
    setMockTodoList(mockTodoList.concat([todo]));
  };

  const deleteTodo = async (id: string) => {
    // const res = await apiClient.delete<Todo[]>("/", {
    //   params: {
    //     id,
    //   },
    // });
    // setTodoList(res.data);

    // Test
    setMockTodoList(mockTodoList.filter((todo) => todo.Id !== id));
  };

  const store = async () => {
    const triggerResult = await trigger();
    if (!triggerResult) return;

    const user = await liff.getProfile();

    // Test
    if (errors) {
      const data: Todo = {
        Id: Math.random().toString(32).substring(2),
        UserId: user.userId,
        Title: getValues("title"),
        Description: getValues("description"),
        Finished: false,
        CreatedAt: Date.now().toString(),
        UpdatedAt: Date.now().toString(),
      };

      await addTodo(data);
      reset({
        title: "",
        description: "",
      });
    }
  };

  return (
    <Style>
      <nav className="title">
        <div className="left-container">
          {ReactLogo}
          <h1 className="name">Todo List</h1>
        </div>
        <h1 className="right-container">Welcome to {liffProfile?.userName}</h1>
      </nav>
      <div className="contents">
        <div className="add">
          <div className="forms">
            <input
              className="add-form"
              type="text"
              placeholder="Title"
              {...register("title", {
                required: true,
              })}
            />
            {errors.title && <p className="error">必須項目です。</p>}
            <textarea
              className="add-textarea"
              placeholder="Description"
              {...register("description")}
            />
          </div>
          <button className="add-button" type="button" onClick={store}>
            ADD
          </button>
        </div>
        {mockTodoList && (
          <>
            <ul className="not-finished">
              {mockTodoList.map((props, index) => (
                <>
                  {!props.Finished && (
                    <li key={index} className="item">
                      <div className="content">
                        <p>{props.Title}</p>
                        <p>{props.Description}</p>
                      </div>
                      <label
                        className="trash"
                        onClick={() => deleteTodo(props.Id)}
                      >
                        {TrashLogo}
                      </label>
                    </li>
                  )}
                </>
              ))}
            </ul>
            <p className="finished-title">Finished</p>
            <ul className="not-finished">
              {mockTodoList.map((props, index) => (
                <>
                  {props.Finished && (
                    <li key={index} className="item">
                      {props.Title}
                      {props.Id}
                      <label
                        className="trash"
                        onClick={() => deleteTodo(props.Id)}
                      >
                        {TrashLogo}
                      </label>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </>
        )}
      </div>
    </Style>
  );
};

const Style = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 15px 20px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    .left-container {
      display: flex;
      align-items: center;
      gap: 15px;

      svg {
        height: 40px;
        fill: ${({ theme }) => theme.colors.button};
      }

      .name {
        color: ${({ theme }) => theme.colors.font};
        font-size: 30px;
      }
    }

    .right-container {
      color: ${({ theme }) => theme.colors.font};
      font-size: 30px;
    }
  }

  .contents {
    margin: 30px 0 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: ${({ theme }) => theme.colors.font};

    .add {
      display: flex;
      gap: 15px;
      width: 100%;

      .forms {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .error {
          color: ${({ theme }) => theme.colors.warning};
          font-size: 15px;
        }

        .add-form {
          color: ${({ theme }) => theme.colors.font};
          padding: 10px;
          font-size: 15px;
          background-color: ${({ theme }) => theme.colors.form};
          border-radius: 7px;
        }

        .add-textarea {
          color: ${({ theme }) => theme.colors.font};
          height: 56px;
          padding: 10px;
          font-size: 15px;
          line-height: 18px;
          background-color: ${({ theme }) => theme.colors.form};
          border-radius: 7px;
        }
      }

      .add-button {
        background-color: ${({ theme }) => theme.colors.button};
        font-size: 13px;
        padding: 15px;
        color: ${({ theme }) => theme.colors.font};
        font-weight: bold;
        border-radius: 7px;

        :hover {
          background-color: ${({ theme }) => theme.colors.hover};
        }
      }
    }

    .not-finished {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      line-height: 18px;
      gap: 10px;
      list-style: none;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 7px;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.form};

        .content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .trash {
          cursor: pointer;
          svg {
            height: 20px;
            fill: ${({ theme }) => theme.colors.font};
            :hover {
              fill: ${({ theme }) => theme.colors.warning};
            }
          }
        }
      }
    }

    .finished-title {
    }

    .not-finished {
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
              fill: ${({ theme }) => theme.colors.warning};
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
