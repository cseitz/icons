import { useMediaQuery } from './useMediaQuery';

/** @export 'hooks' */

export {
    useMediaQuery
}


export function mappedActions<Actions extends Record<string, (...args: any[]) => any>>(actions: Actions) {
    return function <
        Key extends keyof Actions,
        Action extends ((...args: any[]) => any) = Actions[Key]
    >(action: Key, ...args: Parameters<Action>): ReturnType<Action> {
        return actions[action](...args);
    }
}