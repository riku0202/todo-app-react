import liff from "@line/liff/dist/lib";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "./components/Button";
import { Forms } from "./components/Forms";
import { Header } from "./components/Header";
import { useLiff } from "./hook/useLiff";
import { TrashLogo } from "./Svg";
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
      <Header userName={liffProfile.userName} />
      <div className="contents">
        <div className="add">
          <Forms register={register} errors={errors} />
          <Button onClick={store}>ADD</Button>
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
